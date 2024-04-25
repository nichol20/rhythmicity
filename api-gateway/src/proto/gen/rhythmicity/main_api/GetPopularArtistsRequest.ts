// Original file: src/proto/mainApi/artist.proto


export interface GetPopularArtistsRequest {
  'limit'?: (number);
  'offset'?: (number);
  '_limit'?: "limit";
  '_offset'?: "offset";
}

export interface GetPopularArtistsRequest__Output {
  'limit'?: (number);
  'offset'?: (number);
}
