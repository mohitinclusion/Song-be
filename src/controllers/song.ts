import { Request, Response } from "express";
import { SongList } from "../entity/song-list";
import { AppDataSource } from "../data-source";
import multer from "multer";
import path from "path";

const repository = AppDataSource.manager.getRepository(SongList);

export const GetSongList = async (req: Request, res: Response) => {

    const song = await repository.find({});

    return res.status(200).send(song);

}

export const CreateSong = async (req: Request, res: Response) => {
    
    const storage = multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });

    const upload = multer({ storage }).single('file');

    upload(req, res,async (err) => {
        const fileName = req.file.path
        if (!(req.body.song && req.body.artist && req.body.releaseYear && req.body.first && req.body.year && req.body.playCount)) {
            return res.status(400).send({ message: "All input is required" })
        }

    const oldSong = await repository.findOne({ where: { song: req.body.song } });

    if (oldSong) {
        return res.status(409).json({ message: "Song Already Exist." });
    }
        if (err) {
            return res.send(400).send(err);
        }

        const createSong = await repository.save({
            song: req.body.song,
            artist: req.body.artist,
            releaseYear: req.body.releaseYear,
            first: req.body.first,
            year: req.body.year,
            playCount: req.body.playCount,
            image: fileName
        });
        return res.status(201).send(createSong)
       
    })
    
}

export const UpdateSong = async (req: Request, res: Response) => {
    try {
        const { s_id, song, artist, releaseYear, first, year, playCount } = req.body;

        const updateSong = await repository.findOne({ where: { id: s_id } });
        if (!updateSong) {
            return res.status(400).send({ message: "Song doesn't exist" })
        }
        if (updateSong) {
          let result =   await repository.update(
                s_id,
                {
                    id: s_id,
                    song: song,
                    artist: artist,
                    releaseYear: releaseYear,
                    first: first,
                    year: year,
                    playCount: playCount
                });
            const updateSong = await repository.findOne({ where: { id: s_id } });

            return res.status(202).send({
                message: 'Song Updated Successfully',
                data: updateSong
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: 'Something went wrong',
        });
    }

}

export const DeleteSong = async (req: Request, res: Response) => {
    try {
        const { s_id } = req.body

        const getSong = await repository.findOne({ where: { id: parseInt(s_id) } })

        if (!getSong) {
            return res.status(400).send({ message: "Song doesn't exist" })
        }
        await repository.delete(s_id);
        if (s_id) {
            return res.status(200).send({
                message: 'Deleted Successfully'
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: 'Something went wrong'
        });
    }
}

export const GetSongById = async (req: Request, res: Response) => {
    let id = req.query.id as any;
    
    const { ...song } = await repository.findOne({ where: { id: id} });

    return res.status(200).send(song);

}
