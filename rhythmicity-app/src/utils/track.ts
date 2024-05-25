import { SearchedTrack } from "@/types/search"
import { Track } from "@/types/track"

const getTrackName = (track: Track | SearchedTrack) => {
    if ("youtube" in track) {
        return track.spotify.title
    }

    return track.name
}