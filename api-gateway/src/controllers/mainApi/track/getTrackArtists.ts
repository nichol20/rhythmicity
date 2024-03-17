import { Request, Response } from "express";
import { artistClient } from "../../../servers/mainApi";
import { status } from "@grpc/grpc-js";

export default function getTrackArtists(req: Request, res: Response) {
    artistClient.GetArtistsByTrackId({ id: req.params.id }, (err, value) => {
        if(err) {
            if(err.code === status.NOT_FOUND) {
                return res.status(404).json({ message: err.message })
            }

            console.error("Error invoking GetArtistByTrackId: " + err)
            return res.status(500).json({ message: "internal server error"})
        }

        return res.status(200).json(value?.artists)
    })
}