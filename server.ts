import next from 'next';
import express from 'express';

const sequelize = require('./src/server/db');
// const responseHandler = require('./src/server/middle/responseHandler')
const usersRouter = require('./src/server/controller/users');
const auth = require('./src/server/controller/auth');


const app = next({dev: process.env.NODE_ENV !== 'production'});
const handle = app.getRequestHandler();
app.prepare().then(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({extended: false}));
    // server.use(responseHandler);
    server.use('/users', usersRouter);
    server.use('/auth', auth.router);
    // 处理所有其他 Next.js 页面
    server.all('*', (req, res) => {  // 不要显式指定 Request 和 Response 的类型
        return handle(req, res);
    });

    server.listen(3000, () => {
        console.log('> Ready on http://localhost:3000');
    });
}).catch((err) => {
    console.error('Error preparing Next.js app:', err);
});

