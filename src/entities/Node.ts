import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("node")
export class Node {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    x: number = 0;

    @Column()
    y: number = 0;
}