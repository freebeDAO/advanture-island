import 'express';

declare global {
    namespace Express {
        interface Response {
            sendSuccess(data: any): void;

            sendError(params: { error?: any, statusCode?: number, message?: string }): void;

            sendBadRequest(message?: string): void;
        }

        interface Request {
            user?: string;
        }
    }
}
