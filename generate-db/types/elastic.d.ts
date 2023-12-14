interface TrackDocument {
  id: string;
  trackName: string;
  artistNames: string[];
  albumName: string;
  explict: boolean;
  playCount: number;
  genres: string[];
  imageUrl: string;
  lyrics: string;
}
