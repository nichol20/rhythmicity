// Original file: src/proto/mainApi/album.proto

import type { Image as _rhythmicity_main_api_Image, Image__Output as _rhythmicity_main_api_Image__Output } from '../../rhythmicity/main_api/Image';

export interface AlbumSpotify {
  'id'?: (string);
  'popularity'?: (number);
  'images'?: (_rhythmicity_main_api_Image)[];
  'releaseData'?: (string);
}

export interface AlbumSpotify__Output {
  'id'?: (string);
  'popularity'?: (number);
  'images'?: (_rhythmicity_main_api_Image__Output)[];
  'releaseData'?: (string);
}
