import mysql from "mysql2/promise";

// 创建数据库连接池以提高性能
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  queueLimit: 0,
  connectionLimit: 10,
  waitForConnections: true,
});

export default pool;
