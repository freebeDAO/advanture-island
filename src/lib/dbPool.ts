import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: process.env.MYSQL_WAIT_CONNECTION === "true",
  connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT),
  queueLimit: Number(process.env.MYSQL_QUEUE_LIMIT),
});

export default pool;