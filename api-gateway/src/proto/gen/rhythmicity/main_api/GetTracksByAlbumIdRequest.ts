// Original file: src/proto/mainApi/track.proto


export interface GetTracksByAlbumIdRequest {
  'id'?: (string);
  'limit'?: (number);
  'offset'?: (number);
  '_limit'?: "limit";
  '_offset'?: "offset";
}

export interface GetTracksByAlbumIdRequest__Output {
  'id'?: (string);
  'limit'?: (number);
  'offset'?: (number);
}
