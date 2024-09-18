import { Sequelize } from 'sequelize';

// 创建连接池
const sequelize = new Sequelize('adventure', 'root', '', {
  host: 'localhost', // 根据你的 MySQL 主机配置
  dialect: 'mysql',
  pool: {
    max: 5, // 最大连接数
    min: 0,
    acquire: 30000, // 连接超时
    idle: 10000 // 空闲连接保持时间
  }
});

export default sequelize;