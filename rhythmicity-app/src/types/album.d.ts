import { Image, Spotify } from "./common";

export interface SpotifyAlbum extends Spotify {
  images: Image[];
  releaseDate: string;
}

export interface Album {
  id: string;
  name: string;
  totalTracks: number;
  genres: string[];
  styles: string[];
  spotify: SpotifyAlbum;
}

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
  type: string
}