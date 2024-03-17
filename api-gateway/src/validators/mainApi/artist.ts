import joi from "joi"

export interface GetSeveralArtistsQueryObject {
    ids: string | string[]
}

export const getSeveralArtistsQuerySchema = joi.object<GetSeveralArtistsQueryObject>({
    ids: joi.alternatives().try(
        joi.string(), 
        joi.array().items(joi.string())
    )
}) 