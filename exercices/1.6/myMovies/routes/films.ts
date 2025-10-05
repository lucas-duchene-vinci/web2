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
    if (!req.query["minimum-duration"] && !req.query["titleStartWith"]) {
        return res.status(200).json(defaultFilms);
    }
    
    let filteredFilms = [...defaultFilms];

    if(req.query["minimum-duration"]) {
        const durationMini = Number(req.query["minimum-duration"]);
        filteredFilms = filteredFilms.filter(film => film.duration >= durationMini);
    }
    

    if (req.query["titleStartsWith"]) {
        const titleStart = req.query["titleStartsWith"].toString().toLowerCase();
        filteredFilms = filteredFilms.filter(film => film.title.toLowerCase().startsWith(titleStart));
    }

    return res.status(200).json(filteredFilms);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const film = defaultFilms.find((film) => film.id === id);

    if(!film) {
        return res.status(404).send("Not found.");
    }

    return res.send(200).json(film);
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
        return res.status(400).send("Parameter invalid");
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
    return res.send(200).json(newFilm);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = defaultFilms.findIndex((film) => film.id === id);

    if(index === -1) {
        return res.status(404).send("Film not found");
    }

    const deletedElements = defaultFilms.splice(index, 1);
    return res.status(200).json(deletedElements[0]);
});

router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const film = defaultFilms.find((film) => film.id === id);

    if(!film) {
        return res.status(404).send("Film not found");
    }

    const body: unknown = req.body

    if (
        !body || 
        typeof body !== "object" ||
        ("title" in body && typeof body.title !== "string") ||
        ("director" in body && typeof body.director !== "string") ||
        ("duration" in body && typeof body.duration !== "number")
    ) {
        return res.status(400).send("Parameter invalid");
    }

    const { title, director, duration }: Partial<NewFilms> = body;

    if(title) {
        film.title = title;
    }

    if(director) {
        film.director = director;
    }

    if(duration) {
        film.duration = duration;
    }

    return res.status(200).json(film);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const film = defaultFilms.find((film) => film.id === id);

    if(!film) {
        return res.status(404).send("Film not found");
    }

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
        return res.status(400).send("Parameter invalid");
    }

    const { title, director, duration } = body as NewFilms;

    return res.status(200).json(defaultFilms.push({id, title, director, duration}));
});
export default router