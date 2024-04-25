// Original file: src/proto/mainApi/track.proto


export interface GetTracksByArtistIdRequest {
  'id'?: (string);
  'limit'?: (number);
  'offset'?: (number);
  '_limit'?: "limit";
  '_offset'?: "offset";
}

export interface GetTracksByArtistIdRequest__Output {
  'id'?: (string);
  'limit'?: (number);
  'offset'?: (number);
}
