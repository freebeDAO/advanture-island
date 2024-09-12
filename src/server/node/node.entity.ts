import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { format } from "date-fns";

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 0 })
  x!: number;

  @Column({ default: 0 })
  y!: number;

  @CreateDateColumn({
    type: "datetime",
    transformer: {
      from: (date: Date) => format(date, "yyyy-MM-dd HH:mm:ss"),
      to: (date: string) => date,
    },
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "datetime",
    transformer: {
      from: (date: Date) => format(date, "yyyy-MM-dd HH:mm:ss"),
      to: (date: string) => date,
    },
  })
  updatedAt!: Date;
}
