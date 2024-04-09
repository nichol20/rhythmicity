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
