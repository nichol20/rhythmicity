// Original file: src/proto/searchApi/search.proto

import type { Image as _rhythmicity_search_api_Image, Image__Output as _rhythmicity_search_api_Image__Output } from '../../rhythmicity/search_api/Image';

export interface Artist {
  'id'?: (string);
  'name'?: (string);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'images'?: (_rhythmicity_search_api_Image)[];
  'popularity'?: (number);
  'type'?: (string);
}

export interface Artist__Output {
  'id'?: (string);
  'name'?: (string);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'images'?: (_rhythmicity_search_api_Image__Output)[];
  'popularity'?: (number);
  'type'?: (string);
}
