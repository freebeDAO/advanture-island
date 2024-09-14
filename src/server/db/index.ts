import {Sequelize} from 'sequelize';
const useModel = require('./models/users.model.ts')
const axisModel = require('./models/axis.model.ts')
const sequelize = new Sequelize(
    process.env.DB_NAME as string || '',
    process.env.DB_USER as string || '',
    process.env.DB_PASSWORD as string || '', {
    host: process.env.DB_HOST as string || '',
    dialect: 'mysql', // 或其他支持的数据库类型
    port: Number(process.env.DB_PORT as string),
    query: {
        raw: true,
    },
    timezone: '+08:00'
});
const modelDefiners = [
    useModel,
    axisModel
    // Add more models here...
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
