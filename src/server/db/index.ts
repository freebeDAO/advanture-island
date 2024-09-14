import {Sequelize} from 'sequelize';
const useModel = require('./models/users.model.ts')
// const port = process.env.NODE_ENV === 'production' ? 1234 : 3306;
// const user = process.env.NODE_ENV === 'production' ? 'xxx' : 'root';
// const pwd = process.env.NODE_ENV === 'production' ? 'xxx' : 'qtrade';
// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
//
// DB_HOST=localhost
// DB_USER=root
// DB_PASSWORD=yourpassword
// DB_PORT=3306
// DB_NAME=mydatabase
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
    useModel
    // Add more models here...
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
