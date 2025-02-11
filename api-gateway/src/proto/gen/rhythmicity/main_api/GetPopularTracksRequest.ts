// Original file: src/proto/mainApi/track.proto


export interface GetPopularTracksRequest {
  'limit'?: (number);
  'offset'?: (number);
  '_limit'?: "limit";
  '_offset'?: "offset";
}

export interface GetPopularTracksRequest__Output {
  'limit'?: (number);
  'offset'?: (number);
}
