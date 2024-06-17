import { NextFunction, Request, Response } from "express";
import { authClient } from "../servers/authServer";
import { status } from "@grpc/grpc-js";
import { ForbiddenError, InternalServerError, UnauthorizedError } from "../helpers/apiError";

export const mustBeAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) throw new UnauthorizedError("a token is required to access this route")

    const [, token] = authorizationHeader.split(' ')

    authClient.ValidateToken({ token }, (err, value) => {
        if (err) {
            if (err.code === status.UNAUTHENTICATED) {
                return next(new ForbiddenError(err.message))
            }

            console.error("Error invoking ValidateToken: " + err.message)
            return next(new InternalServerError())
        }

        return next()
    })
}