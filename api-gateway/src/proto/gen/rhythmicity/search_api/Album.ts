// Original file: src/proto/searchApi/search.proto

import type { SimplifiedArtist as _rhythmicity_search_api_SimplifiedArtist, SimplifiedArtist__Output as _rhythmicity_search_api_SimplifiedArtist__Output } from '../../rhythmicity/search_api/SimplifiedArtist';
import type { Image as _rhythmicity_search_api_Image, Image__Output as _rhythmicity_search_api_Image__Output } from '../../rhythmicity/search_api/Image';

export interface Album {
  'id'?: (string);
  'name'?: (string);
  'artists'?: (_rhythmicity_search_api_SimplifiedArtist)[];
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
  'artists'?: (_rhythmicity_search_api_SimplifiedArtist__Output)[];
  'genres'?: (string)[];
  'styles'?: (string)[];
  'releaseDate'?: (string);
  'totalTracks'?: (number);
  'images'?: (_rhythmicity_search_api_Image__Output)[];
  'popularity'?: (number);
  'type'?: (string);
}
