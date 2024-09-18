import sequelize from '../lib/db';
import Node from '../models/Node';
// 数据库初始化连接
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('成功连接');
    await Node.sync({ alter: true }); // 同步 Node 模型到数据库
  } catch (error) {
    console.error('数据库连接失败', error);
  }
}

initializeDatabase();