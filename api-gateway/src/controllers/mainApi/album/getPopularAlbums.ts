import { NextFunction, Request, Response } from "express"
import { albumClient } from "../../../servers/mainApi"
import { InternalServerError } from "../../../helpers/apiError"
import { checkLimitAndOffset } from "../../../utils/request"

export default function getPopularAlbums(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const [limit, offset] = checkLimitAndOffset(req.query.limit, req.query.offset)

	albumClient.GetPopularAlbums({ limit, offset }, (err, value) => {
		if (err) {
			console.error("Error invoking GetPopularAlbums: " + err)
			return next(new InternalServerError())
		}

		return res.status(200).json(value?.albums)
	})
}
