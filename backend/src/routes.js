import { Router } from 'express';

import DeliveriesController from './app/controllers/DeliveriesController';

const route = new Router();

route.get('/deliveries', DeliveriesController.index);
route.post('/deliveries', DeliveriesController.store);
route.delete('/deliveries', DeliveriesController.delete);

export default route;
