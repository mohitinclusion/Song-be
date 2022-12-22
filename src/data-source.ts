import * as dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { SongList } from "./entity/song-list";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234567890",
    database: "task_node",
    synchronize: true,
    logging: false,
    entities: [SongList],
    migrations: [],
    subscribers: [],
});
AppDataSource.initialize()
    .then(() => console.log("Database connected"))
    .catch((error) => console.log(error));