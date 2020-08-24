import React, { useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';

import {
  Container,
  Form,
  GeoInputs,
  Reset,
  MapAndTable,
  Table,
  SearchAddress,
} from './styles';

import api from '../../services/api';
import geoLocation from '../../services/geocode';

import MapComponent from '../../components/Map';

const defaultValues = {
  name: '',
  weight: '',
  address: '',
  latitude: '',
  longitude: '',
};

export default function Main() {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    setValue,
    errors,
  } = useForm();

  const [data, setData] = useState([]);
  const [information, setInformation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dataAddress, setDataAddress] = useState({});
  const [points, setPoints] = useState([]);

  // LOAD DELIVERIES DATA TO DISPLAY ON TABLE AND ON MAP
  useEffect(() => {
    (async function loadData() {
      setIsLoading(true);
      try {
        const response = await api.get('/deliveries');

        const pins = response.data.map(({ address, ...item }) => ({
          type: 'Feature',
          properties: { cluster: false, ...item },
          geometry: address.location,
        }));

        setPoints(pins);
        setData(response.data);
      } catch (error) {
        console.error(error);
        toast.error(
          'Houve um erro interno com o servidor, por favor tente novamente mais tarde!'
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // SHOW TOAST ERRORS
  useEffect(() => {
    if (Object.values(errors).length > 0) {
      Object.values(errors).forEach(({ message }) => toast.error(message));
    }
  }, [errors]);

  // LOAD INFORMATION TO DISPLAY BELOW THE MAP
  function loadInformation() {
    const info = {
      totalClient: data.length,
      totalWeight: data.reduce((total, item) => total + item.weight, 0),
    };

    info.ticket = (info.totalWeight / info.totalClient).toFixed(2);

    setInformation(info);
  }

  // LOAD INFORMATION WHEN DATA VALUES CHANGE
  useEffect(() => {
    if (data.length > 0) {
      loadInformation();
    }
    // eslint-disable-next-line
  }, [data]);

  // SUBMIT - CREATE NEW CLIENT ON DATABASE AND ADD IN DATA STATE
  const submit = async (form) => {
    setIsLoading(true);
    try {
      form.address = dataAddress;

      const response = await api.post('/deliveries', form);

      const newPoint = {
        type: 'Feature',
        properties: { cluster: false, ...response.data },
        geometry: response.data.address.location,
      };

      setData([...data, response.data]);
      setPoints([...points, newPoint]);

      toast.success('Cliente cadastrado com sucesso!');

      reset(defaultValues);
    } catch (error) {
      console.error(error);

      toast.error(
        'Houve um erro ao tentar cadastrar o cliente, verifique os dados e tente novamente!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // CALL GOOGLE GEOLOCATION API AND SAVE DATA ON 'dataAddress' STATE
  async function handleGeoLocation() {
    setIsLoading(true);
    try {
      const response = await geoLocation({
        address: getValues().address,
      });

      if (response.status !== 'OK') {
        return toast.error(
          'Dados do endereço não encontrados, verifique-o e tente novamente!'
        );
      }

      [
        { name: 'latitude', value: response.results[0].geometry.location.lat },
        { name: 'longitude', value: response.results[0].geometry.location.lng },
      ].forEach(({ name, value }) => setValue(name, value));

      const addressComponent = response.results[0].address_components;

      setDataAddress({
        street: addressComponent[1].short_name,
        number: +addressComponent[0].short_name,
        complement: '',
        city: addressComponent[3].long_name,
        state: addressComponent[4].short_name,
        country: addressComponent[5].long_name,
        location: response.results[0].geometry.location,
      });
    } catch (error) {
      console.error(error);

      toast.error(
        'Houve um erro ao consultar o endereço informado, por favor tente novamente!'
      );
    } finally {
      setIsLoading(false);
    }
  }

  // DELETE DATA FROM DATABASE AND RESET INPUT VALUES
  async function handleReset() {
    setIsLoading(true);
    try {
      await api.delete('/deliveries');
      setData([]);
      setInformation({});
      setPoints([]);
      reset(defaultValues);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(submit)}>
        <input
          type="text"
          name="name"
          ref={register({ required: "Campo 'Nome Cliente' obrigatório!" })}
          placeholder="Nome Cliente"
        />

        <input
          type="text"
          name="weight"
          ref={register({
            required: "Campo 'Peso da Entrega (KG)' obrigatório!",
            validate: (v) =>
              Number(v) ||
              "Informe apenas números no campo 'Peso da Entrega (KG)'",
          })}
          placeholder="Peso da Entrega (KG)"
        />

        <SearchAddress>
          <input
            type="text"
            name="address"
            ref={register({
              required: "Campo 'Endereço Cliente' obrigatório!",
            })}
            placeholder="Endereço Cliente"
          />

          <button
            type="button"
            onClick={handleGeoLocation}
            disabled={isLoading}
          >
            BUSCAR
          </button>
        </SearchAddress>

        <GeoInputs>
          <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            ref={register}
            disabled
          />
          <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            ref={register}
            disabled
          />
        </GeoInputs>

        <button type="submit" disabled={isLoading}>
          CADASTRAR CLIENTE
        </button>

        <Reset>
          <button type="button" onClick={handleReset} disabled={isLoading}>
            RESETAR CADASTRO
          </button>
        </Reset>
      </Form>

      <MapAndTable>
        <div>
          <MapComponent points={points} />
        </div>

        <p>
          Total de clientes: {information.totalClient}; Peso Total:{' '}
          {information.totalWeight} kg; Ticket Médio: {information.ticket}
        </p>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Rua</th>
              <th>Cidade</th>
              <th>País</th>
              <th>Peso</th>
              <th>Lat</th>
              <th>Lng</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item._id} className={index % 2 === 0 ? 'dark' : 'light'}>
                <td>{item.name}</td>
                <td>{item.address.street}</td>
                <td>{item.address.city}</td>
                <td>{item.address.country}</td>
                <td>{item.weight}</td>
                <td>{item.address.location.coordinates[1]}</td>
                <td>{item.address.location.coordinates[0]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MapAndTable>
    </Container>
  );
}
