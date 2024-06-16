import { NextFunction, Request, Response } from "express";
import { BadRequestError, InternalServerError } from "../../../helpers/apiError";
import { authClient } from "../../../servers/authServer";
import { status } from "@grpc/grpc-js";
import { signUpSchema } from "../../../validators/authServer/auth";

export default function signUp(req: Request, res: Response, next: NextFunction) {
    const { error: validationErr, value } = signUpSchema.validate(req.body)
    if (validationErr) {
        throw new BadRequestError(validationErr.message)
    }

    authClient.SignUp(value, (err, value) => {
        if (err) {
            if (err.code === status.ALREADY_EXISTS) {
                return next(new BadRequestError(err.message))
            }

            console.error("Error invoking SignUp: " + err.message)
            return next(new InternalServerError())
        }

        return res.status(200).json(value)
    })
}