import { Spotify, Image } from "./common"

export interface SpotifyTrack extends Spotify {
  title: string
  durationMs: number
  albumImages: Image[]
}

export interface YoutubeStatistcs {
  viewCount: string
  likeCount: string
  favoriteCount: string
  commentCount: string
}

export interface YoutubeThumbnails {
  default: Image
  medium: Image
  high: Image
  standard: Image
  maxres: Image
}

export interface Youtube {
  title: string
  durationMs: number
  publishedAt: string
  statistics: YoutubeStatistcs
  thumbnails: YoutubeThumbnails
}

export interface Track {
  id: string
  genres: string[]
  styles: string[]
  explicit: boolean
  playCount: number
  spotify: SpotifyTrack
  youtube: Youtube
  lyrics: string | null
}