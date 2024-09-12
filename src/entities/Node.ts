import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("node")
export class Node {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    x!: number;

    @Column()
    y!: number;
}