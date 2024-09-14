import express, {Request, Response, NextFunction} from 'express';
import jwt, {VerifyErrors} from 'jsonwebtoken';
import web3 from '../tool/web3Client';
import Cache from '../tool/cache';
import moment from 'moment';
import {userType} from "src/server/dataType/users";

const {
    createUser,
    getUserList,
} = require('../service/users.service');
const SECRET = process.env.JWT_SECRET || 'YOUR_SECRET_KEY';
const router = express.Router();

function checkToken(token: string): Promise<userType> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (error, user) => {
            if (error) return reject(error);
            resolve(user as userType);  // 使用类型断言
        });
    });
}

async function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const user: userType = await checkToken(token);
        req.headers['token'] = user.address;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
    }
}

router.post('/check', async (req: Request, res: Response) => {
    const {address} = req.body;
    const authHeader = req.headers['authorization'];
    const token: string = authHeader && authHeader.split(' ')[1] || '';
    if (!token) {
        // return res.sendError({statusCode: 403});
        return res.status(403).json({success: false, message: 'Forbidden'});
    }
    try {
        // req.user = await checkToken(token);
        const user: userType = await checkToken(token);
        if(address === user.address) {
            return res.json({success: true, data: true})
        }else {
            return res.status(403).json({success: false, message: 'Forbidden'});
        }
    } catch (error) {
        // return res.sendError({error, statusCode: 403})
        return res.status(403).json({success: false, message: 'Forbidden'});
    }
})
router.get('/challenge', (req: Request, res: Response) => {
    const address = req.query.address as string;  // 确保 address 是字符串
    const challenge = Math.random().toString(36).substring(2);
    const challenges: { [key: string]: string } = Cache.get('challenges') || {};  // 明确类型
    challenges[address] = challenge;
    Cache.set('challenges', challenges, 120);
    res.json({success: true, data: challenge});
});
router.post('/verify', async (req: Request, res: Response) => {
    const {address, signature} = req.body;
    const challenges: { [key: string]: string } = Cache.get('challenges') || {};  // 明确类型
    const challenge: string = challenges[address];
    if (!challenge) {
        //return res.sendError({statusCode: 400});
        res.status(400).json({success: false, message: 'no challenges'});
    }

    const message = web3.utils.utf8ToHex(challenge);
    const recoveredAddress = web3.eth.accounts.recover(message, signature);
    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
        const token = jwt.sign({address}, SECRET, {expiresIn: '1h'});
        delete challenges[address];
        Cache.set('challenges', challenges);
        const list = await getUserList({address});
        const data = list[0] || null;
        if(!data) {
            await createUser({
                address,
                username: 'user'+ list.length+1,
                avatar: '',
                createTime: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
                updateTime: moment.utc().format('YYYY-MM-DD HH:mm:ss')
            });
        }
        //res.sendSuccess(token)
        res.json({success: true, data: token})
    } else {
        // res.sendError({statusCode: 401});
        res.status(401).json({success: false, message: 'Unauthorized'})
    }
});

module.exports = {authenticateToken, checkToken, router};
