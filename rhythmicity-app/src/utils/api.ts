import { Album } from "@/types/album"
import { Artist } from "@/types/artist"
import { BestResult, SearchedAlbum, SearchedArtist, SearchedTrack } from "@/types/search"
import { Track } from "@/types/track"
import { User } from "@/types/user"
import { https } from "@/utils/http"

interface SignUpArgs {
    username: string
    email: string
    password: string
}

export const signUp = async (args: SignUpArgs): Promise<User> => {
    const res = await https.post<User>("sign-up", args)
    return res.data
}

export const signIn = (email: string, password: string): void => {
    https.post("/sign-in", {
        email,
        password
    }, { withCredentials: true })
}

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

export const getTracksByAlbumId = async (albumId: string): Promise<Track[]> => {
    const res = await https.get<Track[]>(`/albums/${albumId}/tracks`)
    return res.data
}

export const getTracksByArtistId = async (artistId: string): Promise<Track[]> => {
    const res = await https.get<Track[]>(`/artists/${artistId}/tracks`)
    return res.data
}

export const getTrack = async (trackId: string): Promise<Track> => {
    const res = await https.get<Track>(`/tracks/${trackId}`)
    return res.data
}

export const getArtist = async (artistId: string): Promise<Artist> => {
    const res = await https.get<Artist>(`/artists/${artistId}`)
    return res.data
}

export const getAlbum = async (albumId: string): Promise<Album> => {
    const res = await https.get<Album>(`/albums/${albumId}`)
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