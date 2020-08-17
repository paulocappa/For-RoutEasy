import { Schema } from 'mongoose';

import PointSchema from './PointSchema';

const AddressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  complement: String,
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
});

export default AddressSchema;
