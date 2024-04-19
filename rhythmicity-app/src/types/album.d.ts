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
