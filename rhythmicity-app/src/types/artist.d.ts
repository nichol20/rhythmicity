import { Image, Spotify } from "./common";

export interface SpotifyArtist extends Spotify {
  images: Image[];
}

export interface Artist {
  id: string;
  name: string;
  genres: string[];
  styles: string[];
  spotify: SpotifyArtist;
}

export interface SearchedArtist {
  id: string
  name: string
  genres: string[]
  styles: string[]
  images: Image[]
  popularity: number
  type: string
}