import express, {Request, Response} from 'express';
import moment from 'moment';
const router = express.Router();
const {
    getAxisAll,
    createAxis,
    updateAxis,
    getAxisList,
    getAxisById,
    removeAxis
} = require('../service/axis.service');

router.post('/create', async (req: Request, res: Response) => {
    const {x, y} = req.body;
    const data = await createAxis({
        x, y, createTime: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        updateTime: moment.utc().format('YYYY-MM-DD HH:mm:ss')
    })
    res.json({success: true, data})
})

router.post('/update', async (req: Request, res: Response) => {
    const {id, x, y} = req.body;
    await updateAxis({
        x, y,
        updateTime: moment.utc().format('YYYY-MM-DD HH:mm:ss')
    }, {id})
    const data = await getAxisById(id);
    res.json({success: true, data});
})
router.get('/remove', async (req: Request, res: Response) => {
    const {id} = req.query;
    await removeAxis(Number(id));
    res.json({success: true, data: true});
})
router.get('/detail', async (req: Request, res: Response) => {
    const {id} = req.query;
    const data = await getAxisById(Number(id));
    res.json({success: true, data});
})
router.get('/list', async (req: Request, res: Response) => {
    const data = await getAxisAll();
    res.json({success: true, data});
})
module.exports = router;
