import { NextApiHandler } from 'next';
import { NextApiRequest, NextApiResponse } from 'next';

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';
export const handlerWrapper = (handlerMap: Partial<Record<Method, NextApiHandler>>) => async (req:NextApiRequest, res:NextApiResponse) => {
    const handler = handlerMap[req.method as Method];
    if (!handler) {
        res.status(500).json({
            message: 'Unsupported method'
        });
        return;
    }
    try {
        const result = await handler(req, res);
        res.status(200).json({
            message: 'success',
            code:200,
            data:result
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'error: ' + e,
            code:500
        });
    }
};

