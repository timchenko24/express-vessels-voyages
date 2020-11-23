import express from 'express';
import { indexPage, portsPage, vesselsPage } from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);

indexRouter.get('/ports', portsPage);
indexRouter.get('/ports/:id', portsPage);

indexRouter.get('/vessels', vesselsPage);
indexRouter.get('/vessels/:id', vesselsPage);

export default indexRouter;
