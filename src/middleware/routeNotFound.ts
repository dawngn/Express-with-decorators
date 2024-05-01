import { Request, Response, NextFunction } from 'express';

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    logging.error(`[404] - ${req.originalUrl} - Not Found`);
    return res.status(404).json({ error : error.message });
}
