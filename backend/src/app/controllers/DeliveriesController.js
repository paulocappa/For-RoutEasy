import * as Yup from 'yup';
import Deliveries from '../schemas/Deliveries';

class DeliveriesController {
  async index(req, res) {
    const deliveries = await Deliveries.find();

    return res.status(200).json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      weight: Yup.number().required(),
      address: Yup.object()
        .shape({
          street: Yup.string().required(),
          number: Yup.number().required(),
          city: Yup.string().required(),
          state: Yup.string().required(),
          country: Yup.string().required(),
          location: Yup.object().shape({
            lat: Yup.number().required(),
            lng: Yup.number().required(),
          }),
        })
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { address } = req.body;

    const saveLocation = {
      type: 'Point',
      coordinates: [address.location.lng, address.location.lat],
    };

    const delivery = await Deliveries.create({
      ...req.body,
      address: {
        ...address,
        location: saveLocation,
      },
    });

    return res.status(200).json(delivery);
  }

  async delete(req, res) {
    await Deliveries.deleteMany({});

    return res.status(200).json({});
  }
}

export default new DeliveriesController();
