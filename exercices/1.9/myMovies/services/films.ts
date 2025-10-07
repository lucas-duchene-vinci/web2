import path from "node:path";
import { Films, NewFilms } from "../types";
import { parse, serialize } from "../utils/json";

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

function readAllFilms(durationMin: number, titleStarts?: string): Films[] {
    const films = parse(jsonDbPath, defaultFilms);

    if(!durationMin && ! titleStarts) {
        return films;
    }

    let filteredFilms = [...films];

    if(durationMin !== undefined) {
        filteredFilms = filteredFilms.filter(film => film.duration >= durationMin);
    }

    if(titleStarts) {
        filteredFilms = filteredFilms.filter(film => film.title.toLowerCase().startsWith(titleStarts));

    }

    return filteredFilms;
};

function readOneFilm(id: number): Films | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const film = films.find((film) => film.id === id);

    if(!film) {
        return undefined;
    }
    return film;
}

function createOneFilm(newFilm: NewFilms): Films {
    const films = parse(jsonDbPath, defaultFilms);

    const nextId = films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;

    const createdFilm = {
        id: nextId,
        ...newFilm,
    };

    films.push(createdFilm);
    serialize(jsonDbPath, films);

    return createdFilm;
};

function deleteOneFilm(id: number): Films | undefined {
    const films = parse(jsonDbPath, defaultFilms);

    const film = films.findIndex((film) => film.id === id);

    if(film === -1) {
        return undefined;
    }

    const deletedElements = films.splice(film, 1);
    serialize(jsonDbPath, films);
    return deletedElements[0];
};

function updateOneFilm(id: number, newFilm: Partial<NewFilms>): Films | undefined {
    const films = parse(jsonDbPath, defaultFilms);

    const film = films.find((film) => film.id === id);

    if(!film) {
        return undefined;
    }

    if(newFilm.title !== undefined) {
        film.title === newFilm.title
    }

    if(newFilm.duration !== undefined) {
        film.duration === newFilm.duration
    }

    if(newFilm.director !== undefined) {
        film.director === newFilm.director
    }

    serialize(jsonDbPath, films);
    return film;
};

export {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm
};