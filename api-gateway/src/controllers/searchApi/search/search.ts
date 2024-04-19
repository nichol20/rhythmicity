import { NextFunction, Request, Response } from "express"
import { searchClient } from "../../../servers/searchApi"
import { searchSchema } from "../../../validators/searchApi/search"
import { InternalServerError } from "../../../helpers/apiError"

export default function search(req: Request, res: Response, next: NextFunction) {
    const { error: validationErr, value } = searchSchema.validate(req.body)
    if (validationErr) {
        return res.status(400).json({ message: validationErr.message })
    }

    searchClient.Search(
        {
            query: value.query,
            limit: value.limit,
            offset: value.offset,
            kind: value.kind,
            filters: value.filters,
        },
        (err, value) => {
            if (err) {
                return next(new InternalServerError())
            }

            return res.status(200).json(value)
        }
    )
}
