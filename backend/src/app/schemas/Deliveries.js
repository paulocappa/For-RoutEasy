import { Schema, model } from 'mongoose';

import AddressSchema from '../utils/AddressSchema';

const DeliveriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    address: {
      type: AddressSchema,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Deliveries', DeliveriesSchema);
