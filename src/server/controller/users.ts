import express, {Request, Response} from 'express';

const router = express.Router();
const {
    getAll,
    createUser,
    getUserList,
} = require('../service/users.service');
const {authenticateToken} = require('./auth');
const moment = require('moment');

router.get('/detail', authenticateToken, async function (req: Request, res: Response) {
    // const {address} = req.user

    const address: string = <string>req.headers['token'];
    if (!address) {
        res.status(401).json({success: false, message: 'data error'})
    } else {
        try {
            const list = await getUserList({address});
            const data = list[0] || null;
            res.json({success: true, data})
        } catch (error) {
            // res.sendSuccess(data);
            // res.sendError({errorCode: 5001, error});
            res.status(500).json({success: false, error, message: 'data error'})
        }
    }
})

router.post('/create', authenticateToken, async function (req: Request, res: Response) {
    const body = req.body;
    // const {address} = req.user
    const address: string = <string>req.headers['token'];
    if (!address) {
        res.status(401).json({success: false, message: 'data error'})
    } else {
        const data = await createUser({
                address,
                createTime: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                updateTime: moment.utc().format('YYYY-MM-DD HH:mm:ss')
            }
        );
        res.json({success: true, data})
    }
})
module.exports = router;
