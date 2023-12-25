interface TrackDocument {
  id: string;
  trackName: string;
  artistNames: string[];
  albumName: string;
  explict: boolean;
  playCount: number;
  genres: string[];
  styles: string[];
  imageUrl: string;
  lyrics: string;
}
