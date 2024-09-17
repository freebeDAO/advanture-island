import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Node {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    x!: number;

    @Column()
    y!: number;
}