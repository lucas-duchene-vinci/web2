import { Router } from "express";
import {  NewFilms } from "../types";
import { createOneFilm, deleteOneFilm, readAllFilms, readOneFilm, updateOneFilm } from "../services/films";

const router = Router();

router.get("/", (req, res) => {
    const durationMin = Number(req.query["minimum-duration"]);
    const titleStarts = req.query["titleStartsWith"]?.toString();
    const films = readAllFilms(durationMin, titleStarts);

    return res.status(200).json(films);
});

router.get("/:id", (req, res) => {

    const id = Number(req.params.id);

    const film = readOneFilm(id);

    if(!film) {
        return res.status(404).send("Error 404: film not found.");
    }

    return res.status(200).json(film);
});

router.post("/", (req, res) => {
    const body: unknown = req.body;

    if(
        !body ||
        typeof body !== "object" ||
        !("title" in body) ||
        !("duration" in body) ||
        !("director" in body) ||
        typeof body.title !== "string" ||
        typeof body.director !== "string" ||
        typeof body.duration !== "number" ||
        !body.title.trim() ||
        !body.director.trim() ||
        body.duration <= 0
    ) {
        return res.status(400).send("Error 400: Bad request.");
    }

    const { title, director, duration } = body as NewFilms;

    const newFilm = createOneFilm({title, director, duration});
    return res.status(200).json(newFilm);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const deletedFilm = deleteOneFilm(id);

    if (!deletedFilm) {
        return res.status(404).send("Error 404: object not found.");
    }

    return res.status(200).json(deletedFilm);
});

router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);

    const body: unknown = req.body;

    if(
        !body ||
        typeof body !== "object" ||
        ("title" in body &&
            (typeof body.title !== "string" || !body.title.trim())) ||
        ("director" in body &&
            (typeof body.director !== "string" || !body.director.trim())) ||
        ("duration" in body &&
            (typeof body.duration !== "number" || body.duration <= 0))
    ) {
        return res.status(400).send("Error 400: Bad request.")
    }

    const { title, director, duration }: Partial<NewFilms> = body;

    const updatedFilm = updateOneFilm(id, {title, director, duration});

    if(!updatedFilm) {
        return res.status(404).send("Error 404: Object not found");
    }

    return res.status(200).json(updatedFilm);
})
export default router