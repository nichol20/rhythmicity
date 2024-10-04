import { SearchedTrack } from "@/types/search";
import { Track } from "@/types/track";

type TrackArg = SearchedTrack | Track | null | undefined

export const getTrackTitle = (track: TrackArg) => {
    if (track) {
        if ("spotify" in track) {
            return track.spotify.title
        }

        return track.name
    }

    return ""
}

export const getTrackImage = (track: TrackArg, type: "small" | "medium" | "big") => {
    let index = 2

    if (type === "medium") index = 1
    if (type === "big") index = 0

    if (track) {
        if ("spotify" in track) {
            return track.spotify.albumImages[index]
        }

        return track.images[index]
    }

    return null
}

export const getTrackDuration = (track: TrackArg) => {
    if (track) {
        if ("youtube" in track) return track.youtube.durationMs
        return track.durationMs
    }

    return 0
}
