import { NextFunction, Request, Response } from "express"
import { albumClient } from "../../../servers/mainApi"
import { InternalServerError } from "../../../helpers/apiError"

export default function getPopularAlbums(
	req: Request,
	res: Response,
	next: NextFunction
) {
	let limit = Number(req.query.limit)

	if (isNaN(limit)) {
		limit = 20
	}

	albumClient.GetPopularAlbums({ limit }, (err, value) => {
		if (err) {
			console.error("Error invoking GetPopularAlbums: " + err)
			return next(new InternalServerError())
		}

		return res.status(200).json(value?.albums)
	})
}
