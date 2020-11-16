import express from 'express';
import indexRouter from "./routes";

const app = express()

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use('/', indexRouter);

export default app;
// app.get('/ports', getPorts)
//
// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
// })
