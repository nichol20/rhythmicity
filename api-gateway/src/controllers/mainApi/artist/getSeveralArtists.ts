import { NextFunction, Request, Response } from "express"
import { getSeveralArtistsQuerySchema } from "../../../validators/mainApi/artist"
import { artistClient } from "../../../servers/mainApi"
import { InternalServerError } from "../../../helpers/apiError"

export default function getSeveralArtist(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { error: validationErr, value: query } =
        getSeveralArtistsQuerySchema.validate(req.query)
    if (validationErr) {
        return res.status(400).json({ message: validationErr.message })
    }

    if (typeof query.ids === "string") {
        query.ids = [query.ids]
    }

    artistClient.GetSeveralArtists({ ids: query.ids }, (err, value) => {
        if (err) {
            console.error("Error invoking GetSeveralTracks: " + err)
            return next(new InternalServerError())
        }

        return res.status(200).json(value?.artists)
    })
}
