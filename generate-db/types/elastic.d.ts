interface Image {
  width: number;
  height: number;
  url: string;
}

interface TrackDocument {
  id: string;
  trackName: string;
  artistNames: string[];
  albumName: string;
  explict: boolean;
  playCount: number;
  durationMs: number;
  genres: string[];
  styles: string[];
  images: Image[];
  lyrics: string;
  type: "track";
}

interface ArtistDocument {
  id: string;
  name: string;
  genres: string[];
  styles: string[];
  images: Image[];
  popularity: number;
  type: "artist";
}

interface AlbumDocument {
  id: string;
  name: string;
  artistNames: string[];
  genres: string[];
  styles: string[];
  popularity: number;
  totalTracks: number;
  releaseDate: string;
  images: Image[];
  type: "album";
}
