import Joi from "joi"

export interface GetSeveralTracksQueryObject {
    ids: string | string[]
}

export const getSeveralTracksQuerySchema = Joi.object<GetSeveralTracksQueryObject>({
    ids: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string())
    )
})

export interface PlaybackObject {
    trackId: string
}

export const playbackSchema = Joi.object<PlaybackObject>({
    trackId: Joi.string().required()
})