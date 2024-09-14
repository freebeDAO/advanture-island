import {DataTypes, NOW}  from 'sequelize';

const axisModel = (sequelize: any) => {
    sequelize.define('axis', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        x: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        y: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }, createTime: {
            field: 'create_time',
            type: DataTypes.DATE,
            defaultValue: NOW
        },
        updateTime: {
            field: 'update_time',
            type: DataTypes.DATE,
            defaultValue: NOW
        },
    }, {
        tableName: 'axis',
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    })
};
module.exports = axisModel
