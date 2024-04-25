import { NextFunction, Request, Response } from "express"
import { artistClient } from "../../../servers/mainApi"
import { InternalServerError } from "../../../helpers/apiError"
import { checkLimitAndOffset } from "../../../utils/request"

export default function getPopularArtists(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const [limit, offset] = checkLimitAndOffset(req.query.limit, req.query.offset)

    artistClient.GetPopularArtists({ limit, offset }, (err, value) => {
        if (err) {
            console.error("Error invoking GetPopularArtists: ", err)
            return next(new InternalServerError())
        }

        return res.status(200).json(value?.artists)
    })
}
