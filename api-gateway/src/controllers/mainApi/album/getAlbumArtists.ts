import { NextFunction, Request, Response } from "express"
import { artistClient } from "../../../servers/mainApi"
import { Status } from "@grpc/grpc-js/build/src/constants"
import { InternalServerError, NotFoundError } from "../../../helpers/apiError"

export default function getAlbumArtists(
	req: Request,
	res: Response,
	next: NextFunction
) {
	artistClient.GetArtistsByAlbumId({ id: req.params.id }, (err, value) => {
		if (err) {
			if (err.code === Status.NOT_FOUND) {
				return next(new NotFoundError(err.message))
			}

			console.error("Error invoking GetArtistsByAlbumId: " + err)
			return next(new InternalServerError())
		}

		return res.status(200).json(value?.artists)
	})
}
