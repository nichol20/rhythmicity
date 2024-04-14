// Original file: src/proto/searchApi/search.proto

import type { Image as _rhythmicity_search_api_Image, Image__Output as _rhythmicity_search_api_Image__Output } from '../../rhythmicity/search_api/Image';

export interface Album {
  'id'?: (string);
  'name'?: (string);
  'artistNames'?: (string)[];
  'genres'?: (string)[];
  'styles'?: (string)[];
  'releaseDate'?: (string);
  'totalTracks'?: (number);
  'images'?: (_rhythmicity_search_api_Image)[];
  'popularity'?: (number);
  'type'?: (string);
}

export interface Album__Output {
  'id'?: (string);
  'name'?: (string);
  'artistNames'?: (string)[];
  'genres'?: (string)[];
  'styles'?: (string)[];
  'releaseDate'?: (string);
  'totalTracks'?: (number);
  'images'?: (_rhythmicity_search_api_Image__Output)[];
  'popularity'?: (number);
  'type'?: (string);
}
