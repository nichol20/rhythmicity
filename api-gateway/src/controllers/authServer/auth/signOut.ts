import { NextFunction, Request, Response } from "express";

export default function signOut(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    })
    return res.sendStatus(200)
}