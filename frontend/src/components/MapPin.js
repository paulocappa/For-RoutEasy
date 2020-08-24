import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip, IconButton } from '@material-ui/core';
import { Room } from '@material-ui/icons';

import ClusterPin from '../styles/clusterPin';

export default function MapPin(props) {
  const {
    cluster: { properties },
    pointsLength = 1,
    onClick,
  } = props;

  const {
    cluster: isCluster,
    point_count: pointCount = 1,
    name,
    weight,
  } = properties;

  return isCluster ? (
    <ClusterPin
      pointCount={pointCount}
      pointsLength={pointsLength}
      onClick={onClick}
    >
      {pointCount}
    </ClusterPin>
  ) : (
    <Tooltip
      title={`${name} - ${weight} Kg`}
      aria-label={`${name} - ${weight} Kg`}
      placement="top"
      style={{
        cursor: 'default',
      }}
    >
      <IconButton color="secondary">
        <Room style={{ color: 'red' }} fontSize="large" />
      </IconButton>
    </Tooltip>
  );
}

MapPin.propTypes = {
  cluster: PropTypes.shape({
    properties: PropTypes.shape({
      cluster: PropTypes.bool,
      point_count: PropTypes.number,
      weight: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
  pointsLength: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
