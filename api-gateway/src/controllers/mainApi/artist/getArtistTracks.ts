import { Request, Response } from "express";
import { trackClient } from "../../../servers/mainApi";
import { Status } from "@grpc/grpc-js/build/src/constants";

export default function getArtistTracks(req: Request, res: Response) {
    trackClient.GetTracksByArtistId({ id: req.params.id }, (err, value) => {
        if(err) {
            if(err.code === Status.NOT_FOUND) {
                return res.status(404).json({ message: err.message })
            }
            
            console.error("Error invoking GetTracksByArtistId: " + err)
            return res.status(500).json({ message: "internal server error" })
        }

        return res.status(200).json(value?.tracks)
    })
}