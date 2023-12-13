interface Album {
  id: string;
  name: string;
  artistIds: string[];
  trackIds: string[];
  genres: string[];
  spotify: {
    id: string;
    popularity: number;
    images: {
      url: string;
      width: number;
      height: number;
    }[];
    releaseDate: string;
  };
  type: "album";
}

interface Artist {
  id: string;
  name: string;
  genres: string[];
  spotify: {
    id: string;
    popularity: number;
    images: {
      url: string;
      width: number;
      height: number;
    }[];
  };
  type: "artist";
}

interface Track {
  id: string;
  artistIds: string[];
  genres: string[];
  explicit: boolean;
  playCount: number;
  lyrics: string;
  spotify: {
    id: string;
    title: string;
    popularity: number;
    durationMs: number;
    albumImages: {
      url: string;
      height: number;
      width: number;
    }[];
  };
  youtube: {
    id: string;
    title: string;
    durationMs: number;
    publishedAt: string;
    statistics: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
    thumbnails: {
      default?: {
        url: string;
        width: 120;
        height: 90;
      };
      medium?: {
        url: string;
        width: 320;
        height: 180;
      };
      high?: {
        url: string;
        width: 480;
        height: 360;
      };
      standard?: {
        url: string;
        width: 640;
        height: 480;
      };
      maxres?: {
        url: string;
        width: 1280;
        height: 720;
      };
    };
  };
  type: "track";
}
