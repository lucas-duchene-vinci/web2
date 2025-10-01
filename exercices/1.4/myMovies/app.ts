import express from "express";
import router from "./routes/films";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let getCounter = 0;

app.use((req, res, next) => {
    if (req.method === 'GET') {
        getCounter++;
        console.log(`Get counter : ${getCounter}`);
    }
    next();
    res.status(200);
})

app.use("/films", router);

export default app;
