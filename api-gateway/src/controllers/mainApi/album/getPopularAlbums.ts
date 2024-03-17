import { Request, Response } from "express";
import { albumClient } from "../../../servers/mainApi";

export default function getPopularAlbums(req: Request, res: Response) {
    let limit = Number(req.query.limit)
    
    if(isNaN(limit)) {
        limit = 20
    }

    albumClient.GetPopularAlbums({ limit }, (err, value) => {
        if(err) {
            console.error("Error invoking GetPopularAlbums: " + err)
            return res.status(500).json({ message: "internal server error" })
        }

        return res.status(200).json(value?.albums)
    })
}