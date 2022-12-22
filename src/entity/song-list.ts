import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SongList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    song: string;
    @Column()
    artist: string;
    @Column()
    releaseYear: string;
    @Column()
    first: number;
    @Column()
    year: number;
    @Column()
    playCount: number;
    @Column()
    image: string;
}