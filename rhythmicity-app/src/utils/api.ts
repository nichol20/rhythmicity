import { Album } from "@/types/album"
import { Artist } from "@/types/artist"
import { BestResult, SearchedAlbum, SearchedArtist, SearchedTrack } from "@/types/search"
import { Track } from "@/types/track"
import { https } from "@/utils/http"

export const getPopularAlbums = async (): Promise<Album[]> => {
    const res = await https.get<Album[]>("/popular/albums")
    return res.data
}

export const getPopularArtists = async (): Promise<Artist[]> => {
    const res = await https.get<Artist[]>("/popular/artists")
    return res.data
}

export const getPopularTracks = async (): Promise<Track[]> => {
    const res = await https.get<Track[]>("/popular/tracks")
    return res.data
}

export interface SearchResponse {
    albums: SearchedAlbum[]
    artists: SearchedArtist[]
    tracks: SearchedTrack[]
    bestResult: BestResult | null
}

export enum QueryKind {
    ALL = "ALL",
    ARTISTS = "ARTISTS",
    ALBUMS = "ALBUMS",
    TRACKS = "TRACKS"
}

export interface SearchFilters {
    genres?: string[]
    styles?: string[]
}

export interface SearchOptions {
    query: string
    offset?: number
    limit?: number
    kind?: QueryKind
    filters?: SearchFilters
}

export const search = async (options: SearchOptions): Promise<SearchResponse> => {
    const res = await https.post<SearchResponse>("/search", options)
    return res.data
}

export interface PlaybackResponse {
    youtubeId: string
}

export const playback = async (trackId: string): Promise<PlaybackResponse> => {
    const res = await https.post<PlaybackResponse>("/playback", {
        trackId
    })
    return res.data
}