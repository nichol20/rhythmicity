import { NextFunction, Request, Response } from "express";
import { signInSchema } from "../../../validators/authServer/auth";
import { BadRequestError, InternalServerError } from "../../../helpers/apiError";
import { authClient } from "../../../servers/authServer";
import { status } from "@grpc/grpc-js";

export default function signIn(req: Request, res: Response, next: NextFunction) {
    const { error: validationErr, value } = signInSchema.validate(req.body)
    if (validationErr) {
        throw new BadRequestError(validationErr.message)
    }

    authClient.SignIn({ email: value.email, password: value.password }, (err, value) => {
        if (err) {
            if (err.code === status.NOT_FOUND || err.code === status.UNAUTHENTICATED) {
                return next(new BadRequestError(err.message))
            }

            console.error("Error invoking SignIn: " + err.message)
            return next(new InternalServerError())
        }

        return res.status(200).json(value)
    })
}