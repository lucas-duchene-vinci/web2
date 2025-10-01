import express from "express";
import router from "./routes/films";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let getCounter = 0;
let postCounter = 0;
let updateCounter = 0;
let deleteCounter = 0;

app.use((req, res, next) => {
    
    

    if(req.method === 'GET') {
        getCounter++;
    }

    if(req.method === 'POST') {
        postCounter++;
    }

    if(req.method === 'UPDATE') {
        updateCounter++;
    }

    if(req.method === 'DELETE') {
        deleteCounter++;
    }

    console.log(`Request Counter : \n
        Get : ${getCounter} \n
        Post : ${postCounter} \n
        Update : ${updateCounter} \n
        Delete : ${deleteCounter}`);
    next();
    res.status(200);
})


app.use("/films", router);

export default app;
