import React from 'react';
import PropTypes from 'prop-types';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { icon } from 'leaflet';

import iconImage from 'leaflet/dist/images/marker-icon.png';

const myIcon = icon({
  iconUrl: iconImage,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

export default function MapView({ markers }) {
  return (
    <Map
      style={{ height: '400px', borderRadius: '4px', border: '1px solid #999' }}
      center={[-23.5904396, -46.6784913]}
      zoom={13}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((item) => {
        const coordinates = [
          item.address.location.coordinates[1],
          item.address.location.coordinates[0],
        ];

        return (
          <Marker
            key={item.address.location._id}
            position={coordinates}
            icon={myIcon}
          >
            <Popup>{`${item.name} - ${item.weight} Kg`}</Popup>
          </Marker>
        );
      })}
    </Map>
  );
}

MapView.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.object).isRequired,
};
