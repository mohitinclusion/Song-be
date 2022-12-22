import express, { Router } from "express";
import { CreateSong, DeleteSong, GetSongById, GetSongList, UpdateSong } from "./controllers/song";
import multer from "multer";
import path from "path";
const app = express();

export const routes = (router: Router) => {
    router.get('/song-list', GetSongList);
    router.get('/song', GetSongById);
    router.post('/create-song', CreateSong);

    router.use("/uploads", express.static('./uploads'));

    router.patch('/update-song', UpdateSong);
    router.delete('/delete-song', DeleteSong);
}