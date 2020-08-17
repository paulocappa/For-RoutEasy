import axios from 'axios';

const geoCode = async (address) =>
  (
    await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: process.env.REACT_APP_GOOGLE_KEY,
      },
    })
  ).data;

export default geoCode;
