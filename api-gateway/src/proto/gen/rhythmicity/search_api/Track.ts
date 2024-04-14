// Original file: src/proto/searchApi/search.proto

import type { Image as _rhythmicity_search_api_Image, Image__Output as _rhythmicity_search_api_Image__Output } from '../../rhythmicity/search_api/Image';
import type { Long } from '@grpc/proto-loader';

export interface Track {
  'id'?: (string);
  'name'?: (string);
  'artistNames'?: (string)[];
  'albumName'?: (string);
  'lyrics'?: (string);
  'explicit'?: (boolean);
  'playCount'?: (number | string | Long);
  'durationMs'?: (number);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'images'?: (_rhythmicity_search_api_Image)[];
  'type'?: (string);
}

export interface Track__Output {
  'id'?: (string);
  'name'?: (string);
  'artistNames'?: (string)[];
  'albumName'?: (string);
  'lyrics'?: (string);
  'explicit'?: (boolean);
  'playCount'?: (Long);
  'durationMs'?: (number);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'images'?: (_rhythmicity_search_api_Image__Output)[];
  'type'?: (string);
}
