import express from 'express';
import { indexPage } from '../controllers';
import { portsPage } from '../controllers/ports';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/ports', portsPage);

export default indexRouter;
