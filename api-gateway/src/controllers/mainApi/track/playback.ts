import { NextFunction, Request, Response } from "express";
import { trackClient } from "../../../servers/mainApi";
import { playbackSchema } from "../../../validators/mainApi/track";
import { BadRequestError, InternalServerError, NotFoundError } from "../../../helpers/apiError";
import { Status } from "@grpc/grpc-js/build/src/constants";

export default function playback(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { error, value } = playbackSchema.validate(req.body)

    if (error) {
        throw new BadRequestError(error.message)
    }

    trackClient.Playback({ id: value.trackId }, (err, value) => {
        if (err) {
            if (err.code === Status.NOT_FOUND) {
                return next(new NotFoundError(err.message))
            }

            console.error("Error invoking Playback: " + err)
            return next(new InternalServerError())
        }

        return res.status(200).json(value)
    })

}
