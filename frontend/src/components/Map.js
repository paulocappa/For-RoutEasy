import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';

import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../constants/map';

import MapContainer from '../styles/mapContainer';

import MapPin from './MapPin';

export default function MapComponent({ points = [] }) {
  const mapRef = useRef();

  const [mapData, setMapData] = useState({
    zoom: 10,
    bounds: null,
  });

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: mapData.bounds,
    zoom: mapData.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        defaultCenter={DEFAULT_CENTER}
        defaultZoom={DEFAULT_ZOOM}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setMapData({
            zoom,
            bounds: [
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ],
          });
        }}
      >
        {clusters.map((cluster) => {
          const [lng, lat] = cluster.geometry.coordinates;

          return (
            <MapPin
              key={cluster.properties.cluster_id || cluster.properties._id}
              lat={lat}
              lng={lng}
              cluster={cluster}
              pointsLength={points.length}
              onClick={() => {
                const expansionZoom = Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id),
                  20
                );
                mapRef.current.setZoom(expansionZoom);
                mapRef.current.panTo({ lat, lng });
              }}
            />
          );
        })}
      </GoogleMapReact>
    </MapContainer>
  );
}

MapComponent.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
};
