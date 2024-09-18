import { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/db'; // 导入 Sequelize 实例

class Node extends Model {
  public id!: number; // id 必须存在
  public x!: number;  // x 坐标
  public y!: number;  // y 坐标
}

Node.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  x: {
    type: DataTypes.INTEGER,
    defaultValue: 0,  // 初始状态为 0
    allowNull: false,
  },
  y: {
    type: DataTypes.INTEGER,
    defaultValue: 0,  // 初始状态为 0
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Node',
  tableName: 'nodes',
  timestamps: false,  // 禁用自动时间戳
});

export default Node;
