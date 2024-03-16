// Original file: src/proto/track.proto

import type { Image as _rhythmicity_main_api_Image, Image__Output as _rhythmicity_main_api_Image__Output } from '../../rhythmicity/main_api/Image';

export interface TrackSpotify {
  'id'?: (string);
  'title'?: (string);
  'popularity'?: (number);
  'durationMs'?: (number);
  'albumImages'?: (_rhythmicity_main_api_Image)[];
}

export interface TrackSpotify__Output {
  'id'?: (string);
  'title'?: (string);
  'popularity'?: (number);
  'durationMs'?: (number);
  'albumImages'?: (_rhythmicity_main_api_Image__Output)[];
}
