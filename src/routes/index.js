import express from 'express';
import { indexPage, portsPage } from '../controllers';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/ports', portsPage);
indexRouter.get('/ports/:id', portsPage);

export default indexRouter;
