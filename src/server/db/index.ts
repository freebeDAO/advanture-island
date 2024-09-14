import {Sequelize} from 'sequelize';
const useModel = require('./models/users.model.ts')
const port = process.env.NODE_ENV === 'production' ? 1234 : 3306;
const user = process.env.NODE_ENV === 'production' ? 'xxx' : 'root';
const pwd = process.env.NODE_ENV === 'production' ? 'xxx' : 'qtrade';
// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize('test', user, pwd, {
    host: 'localhost',
    dialect: 'mysql', // 或其他支持的数据库类型
    port,
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
