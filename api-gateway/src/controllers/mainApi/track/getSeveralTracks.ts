import { NextFunction, Request, Response } from "express"
import { trackClient } from "../../../servers/mainApi"
import { getSeveralTracksQuerySchema } from "../../../validators/mainApi/track"
import { BadRequestError, InternalServerError } from "../../../helpers/apiError"

export default function getSeveralTracks(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { error: validationErr, value: query } = getSeveralTracksQuerySchema.validate(req.query)
    if (validationErr) {
        throw new BadRequestError(validationErr.message)
    }

    if (typeof query.ids === "string") {
        query.ids = [query.ids]
    }

    trackClient.GetSeveralTracks({ ids: query.ids }, (err, value) => {
        if (err) {
            console.error("Error invoking GetSeveralTracks: " + err)
            return next(new InternalServerError())
        }

        return res.status(200).json(value?.tracks)
    })
}
