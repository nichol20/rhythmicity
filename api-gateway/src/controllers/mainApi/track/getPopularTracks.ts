import { NextFunction, Request, Response } from "express"
import { trackClient } from "../../../servers/mainApi"
import { InternalServerError } from "../../../helpers/apiError"
import { checkLimitAndOffset } from "../../../utils/request"

export default function getPopularTracks(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const [limit, offset] = checkLimitAndOffset(req.query.limit, req.query.offset)

    trackClient.GetPopularTracks({ limit, offset }, (err, value) => {
        if (err) {
            console.error("Error invoking GetPopularTracks: " + err)
            return next(new InternalServerError())
        }
        return res.status(200).json(value?.tracks)
    })
}
