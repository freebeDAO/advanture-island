import {Request, Response, NextFunction} from 'express';

// 常见的错误消息映射
const errorCodeToMsg = {
    400: 'Unknown error',
    401: "Unauthorized",  // 未授权
    403: "Forbidden",     // 禁止访问
    500: "Internal Server Error",  // 服务器内部错误
};

// 定义中间件
function responseHandler(req: Request, res: Response, next: NextFunction) {

    // 成功响应
    res.sendSuccess = function (data: any) {
        res.status(200).json({success: true, data});
    };

    // 错误响应
    res.sendError = function ({error, statusCode = 500, message}:
                                  { error?: any, statusCode?: number, message?: string }) {

        // 默认错误消息
        const errorRes = {
            success: false,
            message: message || errorCodeToMsg[statusCode] || "Unknown Error",
        };

        // 记录错误日志
        if (error) {
            console.error("Error: ", error);
        }

        console.error("Response: ", errorRes);

        // 发送错误响应
        res.status(statusCode).json(errorRes);
    };

    // 参数验证失败处理
    res.sendBadRequest = function (message = "Bad Request") {
        res.status(400).json({
            success: false,
            message: message,
        });
    };

    next();
}

export default responseHandler;
