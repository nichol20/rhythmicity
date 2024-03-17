import { Request, Response } from "express";
import { getSeveralArtistsQuerySchema } from "../../../validators/mainApi/artist";
import { artistClient } from "../../../servers/mainApi";

export default function getSeveralArtists(req: Request, res: Response) {
    const { error: validationErr, value: query } = getSeveralArtistsQuerySchema.validate(req.query)
    if(validationErr) {
        return res.status(400).json({ message: validationErr.message })
    }

    if(typeof query.ids === "string") {
        query.ids = [query.ids]
    }

    artistClient.GetSeveralArtists({ids: query.ids}, (err, value) => {
        if(err) {
            console.error("Error invoking GetSeveralTracks: " + err)
            return res.status(500).json({ message: "internal server error" })
        }

        return res.status(200).json(value?.artists)
    })
}