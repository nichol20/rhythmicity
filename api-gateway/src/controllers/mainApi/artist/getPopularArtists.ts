import { Request, Response } from "express";
import { artistClient } from "../../../servers/mainApi";

export default function getPopularArtists(req: Request, res: Response) {
    let limit = Number(req.query.limit)
    
    if(isNaN(limit)) {
        limit = 20
    }

    artistClient.GetPopularArtists({ limit }, (err, value) => {
        if(err) {
            console.error("Error invoking GetPopularArtists: ", err)
            return res.status(500).json({ message: "internal server error "})
        }

        return res.status(200).json(value?.artists)
    })
}