import { NextFunction, Request, Response } from "express";

export default function getUser(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.user)
}