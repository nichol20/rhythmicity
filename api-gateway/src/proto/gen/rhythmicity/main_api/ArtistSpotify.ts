// Original file: src/proto/mainApi/artist.proto

import type { Image as _rhythmicity_main_api_Image, Image__Output as _rhythmicity_main_api_Image__Output } from '../../rhythmicity/main_api/Image';

export interface ArtistSpotify {
  'id'?: (string);
  'popularity'?: (number);
  'images'?: (_rhythmicity_main_api_Image)[];
}

export interface ArtistSpotify__Output {
  'id'?: (string);
  'popularity'?: (number);
  'images'?: (_rhythmicity_main_api_Image__Output)[];
}
