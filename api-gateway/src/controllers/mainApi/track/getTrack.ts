import { NextFunction, Request, Response } from "express"
import { trackClient } from "../../../servers/mainApi"
import { status } from "@grpc/grpc-js"
import { InternalServerError, NotFoundError } from "../../../helpers/apiError"

export default function getTrack(
    req: Request,
    res: Response,
    next: NextFunction
) {
    trackClient.GetTrack({ id: req.params.id }, (err, value) => {
        if (err) {
            if (err.code === status.NOT_FOUND) {
                return next(new NotFoundError(err.message))
            }

            console.error("Error invoking GetTrack: " + err.message)
            return next(new InternalServerError())
        }

        return res.status(200).json(value)
    })
}
