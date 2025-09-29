import express from "express";
import router from "./routes/films";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/films", router);

export default app;
