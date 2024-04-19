import { Image } from "./common"

export interface SearchedAlbum {
    id: string
    name: string
    artistNames: string[]
    genres: string[]
    styles: string[]
    releaseDate: string
    totalTracks: number
    images: Image[]
    popularity: number
    type: "album"
}

export interface SearchedArtist {
    id: string
    name: string
    genres: string[]
    styles: string[]
    images: Image[]
    popularity: number
    type: "artist"
}

export interface SearchedTrack {
    id: string
    name: string
    artistNames: string[]
    albumName: string
    lyrics: string
    explicit: boolean
    playCount: number
    durationMs: number
    genres: string[]
    styles: string[]
    images: Image[]
    type: "track"
}

type BestResult = {
    album: SearchedAlbum
    bestResult: "album"
} | {
    artist: SearchedArtist
    bestResult: "artist"
} | {
    track: SearchedTrack
    bestResult: "track"
}
