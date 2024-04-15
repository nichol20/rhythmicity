import { NextFunction, Request, Response } from "express"
import { albumClient } from "../../../servers/mainApi"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { InternalServerError, NotFoundError } from "../../../helpers/apiError"

export default function getAlbum(
    req: Request,
    res: Response,
    next: NextFunction
) {
    albumClient.GetAlbum({ id: req.params.id }, (err, value) => {
        if (err) {
            if (err.code === Status.NOT_FOUND) {
                return next(new NotFoundError(err.message))
            }

            console.error("Error invoking GetAlbum: " + err)
            return next(new InternalServerError())
        }

        return res.status(200).json(value)
    })
}
