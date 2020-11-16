import express from 'express';
import bodyParser from 'body-parser';
import {getPorts} from "./controllers/ports";
import indexRouter from "./routes";

const app = express()

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use('/v1', indexRouter);

export default app;
// app.get('/ports', getPorts)
//
// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
// })
