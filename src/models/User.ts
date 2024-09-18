// models/User.ts

import { Model, Column, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  address!: string;

  @Column
  nickname!: string;

  @Column
  avatar!: string;
}
