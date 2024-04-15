import { NextFunction, Request, Response } from "express"
import { trackClient } from "../../../servers/mainApi"
import { InternalServerError } from "../../../helpers/apiError"

export default function getPopularTracks(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let limit = Number(req.query.limit)

    if (isNaN(limit)) {
        limit = 20
    }

    trackClient.GetPopularTracks({ limit }, (err, value) => {
        if (err) {
            console.error("Error invoking GetPopularTracks: " + err)
            return next(new InternalServerError())
        }
        return res.status(200).json(value?.tracks)
    })
}
