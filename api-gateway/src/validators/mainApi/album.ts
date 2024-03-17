import joi from "joi"

export interface GetSeveralAlbumsQueryObject {
    ids: string | string[]
}

export const getSeveralAlbumsQuerySchema = joi.object<GetSeveralAlbumsQueryObject>({
    ids: joi.alternatives().try(
        joi.string(), 
        joi.array().items(joi.string())
    )
}) 