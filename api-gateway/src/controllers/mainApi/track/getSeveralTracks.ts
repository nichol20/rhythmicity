import { Request, Response } from "express";
import { trackClient } from "../../../servers/mainApi";
import { getSeveralTracksQuerySchema } from "../../../validators/mainApi/track";

async function getSeveralTracks(req: Request, res: Response) {
    const { error: validationErr, value: query } = getSeveralTracksQuerySchema.validate(req.query, )
    if(validationErr) {
        return res.status(400).json({ message: validationErr.message })
    }

    if(typeof query.ids === "string") {
        query.ids = [query.ids]
    }

    trackClient.GetSeveralTracks({ ids: query.ids }, (err, value) => {
        if(err) {
            console.error("Error invoking GetSeveralTracks: " + err)
            return res.status(500).json({ message: "internal server error" })
        }

        return res.status(200).json(value?.tracks)
    })
}

export default getSeveralTracks