import { Request, Response } from "express";
import { trackClient } from "../../../servers/mainApi"

function getTrack(req: Request, res: Response) {    
    trackClient.GetTrack({ id: req.params.id }, (err, value) => {
        if(err) {
            if(err.message === "track not found") {
                return res.status(404).json({ message: err.message })
            }
            
            console.error("Error invoking GetTrack: " + err.message)
            return res.status(500).json({ message: "Internal server error" })
        }

        return res.status(200).json(value)
    })
}

export default getTrack