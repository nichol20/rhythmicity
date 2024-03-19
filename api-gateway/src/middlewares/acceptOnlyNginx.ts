import { NextFunction, Request, Response } from 'express';

export default function acceptOnlyNginx(req: Request, res: Response, next: NextFunction) {
    const remoteAddress = req.socket.remoteAddress?.split("::ffff:")[1]
    if(process.env.NGINX_IP !== remoteAddress) {
        return res.status(403).send('Access Forbidden')
    }
    next()
}