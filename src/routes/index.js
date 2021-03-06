import express from 'express';
import {
  indexPage, portsPage, routesPage, vesselsPage, voyagesPage
} from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/ports', portsPage);
indexRouter.get('/ports/:id', portsPage);

indexRouter.get('/vessels', vesselsPage);
indexRouter.get('/vessels/:id', vesselsPage);

indexRouter.get('/routes', routesPage);
indexRouter.get('/routes/:id', routesPage);

indexRouter.get('/voyages', voyagesPage);
indexRouter.get('/voyages/:id', voyagesPage);

export default indexRouter;
