import { NextFunction, Request, Response } from "express"
import { trackClient } from "../../../servers/mainApi"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { InternalServerError, NotFoundError } from "../../../helpers/apiError"
import { checkLimitAndOffset } from "../../../utils/request"

export default function getArtistTracks(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const [limit, offset] = checkLimitAndOffset(req.query.limit, req.query.offset)

    trackClient.GetTracksByArtistId({ id: req.params.id, limit, offset }, (err, value) => {
        if (err) {
            if (err.code === Status.NOT_FOUND) {
                return next(new NotFoundError(err.message))
            }

            console.error("Error invoking GetTracksByArtistId: " + err)
            return next(new InternalServerError())
        }

        return res.status(200).json(value?.tracks)
    })
}
