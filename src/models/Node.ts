import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

// 定义 Node 实体模型
const Node = sequelize.define('Node', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  x: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // 默认坐标
  },
  y: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // 默认坐标
  }
});

export default Node;