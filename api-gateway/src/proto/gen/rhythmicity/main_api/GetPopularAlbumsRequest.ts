// Original file: src/proto/mainApi/album.proto


export interface GetPopularAlbumsRequest {
  'limit'?: (number);
  'offset'?: (number);
  '_limit'?: "limit";
  '_offset'?: "offset";
}

export interface GetPopularAlbumsRequest__Output {
  'limit'?: (number);
  'offset'?: (number);
}
