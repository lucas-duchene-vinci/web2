import { Router } from "express";
import { Films, NewFilms } from "../types";
// import path from "node:path";
// import { parse } from "../utils/json";

const router = Router();

// const _jsonDbPath = path.join(__dirname, "/../data/films.json");

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
    if (!req.query["minimum-duration"]) {
        res.json(defaultFilms);
    }
    const durationMini = Number(req.query["minimum-duration"]);
    const filteredFilms = defaultFilms.filter((film) => {
        return film.duration >= durationMini;
    })
    res.sendStatus(200).json(filteredFilms);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const film = defaultFilms.find((film) => film.id === id);

    if(!film) {
        return res.sendStatus(404);
    }

    return res.json(film);
});

router.post("/", (req, res) => {
    const body: unknown = req.body;

    if (
        !body || 
        typeof body !== "object" ||
        !("title" in body) ||
        !("director" in body) ||
        !("duration" in body) ||
        typeof body.title !== "string" ||
        typeof body.director !== "string" ||
        typeof body.duration !== "number" ||
        !body.title.trim() ||
        !body.director.trim() ||
        body.duration <= 0
    ) {
        return res.sendStatus(400);
    }

    const { title, director, duration } = body as NewFilms

    const nextId =
        defaultFilms.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;
    
    const newFilm: Films = {
        id: nextId,
        title,
        director,
        duration
    };
    
    defaultFilms.push(newFilm);
    return res.json(newFilm);
    
});
export default router