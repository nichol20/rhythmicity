import joi from "joi"

export interface GetSeveralTracksQueryObject {
    ids: string | string[]
}

export const getSeveralTracksQuerySchema = joi.object<GetSeveralTracksQueryObject>({
    ids: joi.alternatives().try(
        joi.string(), 
        joi.array().items(joi.string())
    )
}) 