/* eslint-disable @typescript-eslint/no-var-requires */
import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mysql = require('mysql2');
const sequelize = new Sequelize({
  dialect: 'mysql',
  dialectModule: mysql,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User],
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });
export default sequelize;
