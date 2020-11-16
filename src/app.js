import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import indexRouter from './routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use('/', indexRouter);

export default app;
