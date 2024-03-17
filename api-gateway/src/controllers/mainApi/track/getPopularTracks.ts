import { Request, Response } from "express";
import { trackClient } from "../../../servers/mainApi";

export default function getPopularTracks(req: Request, res: Response) {
    let limit = Number(req.query.limit)
    
    if(isNaN(limit)) {
        limit = 20
    }

    trackClient.GetPopularTracks({ limit }, (err, value) => {
        if(err) {
            console.error("Error invoking GetPopularTracks: " + err)
            return res.status(500).json({ message: 'internal server error'})
        }
        return res.status(200).json(value?.tracks)
    })
}