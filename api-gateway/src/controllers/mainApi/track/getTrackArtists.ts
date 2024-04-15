import { NextFunction, Request, Response } from "express"
import { artistClient } from "../../../servers/mainApi"
import { status } from "@grpc/grpc-js"
import { InternalServerError, NotFoundError } from "../../../helpers/apiError"

export default function getTrackArtists(
    req: Request,
    res: Response,
    next: NextFunction
) {
    artistClient.GetArtistsByTrackId({ id: req.params.id }, (err, value) => {
        if (err) {
            if (err.code === status.NOT_FOUND) {
                return next(new NotFoundError(err.message))
            }

            console.error("Error invoking GetArtistByTrackId: " + err)
            return next(new InternalServerError())
        }

        return res.status(200).json(value?.artists)
    })
}
