import { SimplifiedArtist } from "./artist";
import { Image, Spotify } from "./common";

export interface SpotifyAlbum extends Spotify {
  images: Image[];
  releaseDate: string;
}

export interface Album {
  id: string;
  name: string;
  artists: SimplifiedArtist[]
  totalTracks: number;
  genres: string[];
  styles: string[];
  spotify: SpotifyAlbum;
}

export interface SimplifiedAlbum {
  id: string;
  name: string;
}