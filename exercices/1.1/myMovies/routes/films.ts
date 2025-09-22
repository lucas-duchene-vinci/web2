import { Router } from "express";
import { Films } from "../types";
import path from "node:path";
import { parse } from "../utils/json";

const router = Router();

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Films[] = [

    {
        id: 1,
        title: "HomeFront",
        director: "Barbara Florentino",
        duration: 100
    },

    {
        id: 2,
        title: "Jason Bourne",
        director: "Paul Greengrass",
        duration: 123
    },

    {
        id: 3,
        title: "The Foreigner",
        director: "Martin Campbell",
        duration: 113
    }
];

router.get("/", (req, res) => {
    
    if (req.query.order && typeof req.query.order !== "string") {
        return res.sendStatus(400);
    }

    const orderByTitle =
        typeof req.query.order === "string" && req.query.order.includes("title")
        ? req.query.order
        : undefined;

    let orderedFilms: Films[] = [];

    const films = parse(jsonDbPath, defaultFilms);

    if(orderByTitle)
        orderedFilms = [...films].sort((a,b) => a.title.localeCompare(b.title));
    
    if(orderByTitle === "-title") orderedFilms = orderedFilms.reverse();

    return res.json(orderedFilms.length === 0 ? films : orderedFilms);
});