import { NextFunction, Request, Response } from "express"
import { artistClient } from "../../../servers/mainApi"
import { InternalServerError } from "../../../helpers/apiError"

export default function getPopularArtists(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let limit = Number(req.query.limit)

    if (isNaN(limit)) {
        limit = 20
    }

    artistClient.GetPopularArtists({ limit }, (err, value) => {
        if (err) {
            console.error("Error invoking GetPopularArtists: ", err)
            return next(new InternalServerError())
        }

        return res.status(200).json(value?.artists)
    })
}
