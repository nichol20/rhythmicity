// Original file: src/proto/mainApi/track.proto

import type { Image as _rhythmicity_main_api_Image, Image__Output as _rhythmicity_main_api_Image__Output } from '../../rhythmicity/main_api/Image';

export interface YoutubeThumbnails {
  'default'?: (_rhythmicity_main_api_Image | null);
  'medium'?: (_rhythmicity_main_api_Image | null);
  'high'?: (_rhythmicity_main_api_Image | null);
  'standard'?: (_rhythmicity_main_api_Image | null);
  'maxres'?: (_rhythmicity_main_api_Image | null);
  '_default'?: "default";
  '_medium'?: "medium";
  '_high'?: "high";
  '_standard'?: "standard";
  '_maxres'?: "maxres";
}

export interface YoutubeThumbnails__Output {
  'default'?: (_rhythmicity_main_api_Image__Output);
  'medium'?: (_rhythmicity_main_api_Image__Output);
  'high'?: (_rhythmicity_main_api_Image__Output);
  'standard'?: (_rhythmicity_main_api_Image__Output);
  'maxres'?: (_rhythmicity_main_api_Image__Output);
}
