import { Request, Response } from "express";
import { getSeveralAlbumsQuerySchema } from "../../../validators/mainApi/album";
import { albumClient } from "../../../servers/mainApi";

export default function getSeveralAlbums(req: Request, res: Response) {
    const { error: validationErr, value: query } = getSeveralAlbumsQuerySchema.validate(req.query)
    if(validationErr) {
        return res.status(400).json({ message: validationErr.message })
    }

    if(typeof query.ids === "string") {
        query.ids = [query.ids]
    }

    albumClient.GetSeveralAlbums({ ids: query.ids }, (err, value) => {
        if(err) {
            console.error("Error invoking GetSeveralAlbums: " + err)
            return res.status(500).json({ message: "internal server error" })
        }

        return res.status(200).json(value?.albums)
    })
}