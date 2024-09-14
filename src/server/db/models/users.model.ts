const {DataTypes, NOW} = require('sequelize');

const useModel = (sequelize: any) => {
    sequelize.define('users', {
        address: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(255),
            defaultValue: ''
        },
        avatar: {
            type: DataTypes.STRING(255),
            defaultValue: ''
        },
        createTime: {
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
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    });
};
module.exports = useModel
