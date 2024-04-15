import { Status } from "@grpc/grpc-js/build/src/constants"
import { artistClient } from "../../../servers/mainApi"
import { NextFunction, Request, Response } from "express"
import { InternalServerError, NotFoundError } from "../../../helpers/apiError"

export default function getArtist(
    req: Request,
    res: Response,
    next: NextFunction
) {
    artistClient.GetArtist({ id: req.params.id }, (err, value) => {
        if (err) {
            if (err.code === Status.NOT_FOUND) {
                return next(new NotFoundError(err.message))
            }

            console.error("Error invoking GetArtist: " + err)
            return next(new InternalServerError())
        }

        return res.status(200).json(value)
    })
}
