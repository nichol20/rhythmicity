import { Status } from "@grpc/grpc-js/build/src/constants";
import { artistClient } from "../../../servers/mainApi";
import { Request, Response } from "express";

export default function getArtist(req: Request, res: Response) {
    artistClient.GetArtist({ id: req.params.id }, (err, value) => {
        if(err) {
            if(err.code === Status.NOT_FOUND) {
                return res.status(404).json({ message: err.message })
            }

            console.error("Error invoking GetArtist: " + err)
            return res.status(500).json({ message: "internal server error "})
        }

        return res.status(200).json(value)
    })
}