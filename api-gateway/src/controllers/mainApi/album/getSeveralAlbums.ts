import { NextFunction, Request, Response } from "express"
import { getSeveralAlbumsQuerySchema } from "../../../validators/mainApi/album"
import { albumClient } from "../../../servers/mainApi"
import { InternalServerError } from "../../../helpers/apiError"

export default function getSeveralAlbums(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { error: validationErr, value: query } =
        getSeveralAlbumsQuerySchema.validate(req.query)
    if (validationErr) {
        return res.status(400).json({ message: validationErr.message })
    }

    if (typeof query.ids === "string") {
        query.ids = [query.ids]
    }

    albumClient.GetSeveralAlbums({ ids: query.ids }, (err, value) => {
        if (err) {
            console.error("Error invoking GetSeveralAlbums: " + err)
            return next(new InternalServerError())
        }

        return res.status(200).json(value?.albums)
    })
}
