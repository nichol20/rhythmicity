// Original file: src/proto/searchApi/search.proto

import type { SimplifiedArtist as _rhythmicity_search_api_SimplifiedArtist, SimplifiedArtist__Output as _rhythmicity_search_api_SimplifiedArtist__Output } from '../../rhythmicity/search_api/SimplifiedArtist';
import type { SimplifiedAlbum as _rhythmicity_search_api_SimplifiedAlbum, SimplifiedAlbum__Output as _rhythmicity_search_api_SimplifiedAlbum__Output } from '../../rhythmicity/search_api/SimplifiedAlbum';
import type { Image as _rhythmicity_search_api_Image, Image__Output as _rhythmicity_search_api_Image__Output } from '../../rhythmicity/search_api/Image';
import type { Long } from '@grpc/proto-loader';

export interface Track {
  'id'?: (string);
  'name'?: (string);
  'artists'?: (_rhythmicity_search_api_SimplifiedArtist)[];
  'album'?: (_rhythmicity_search_api_SimplifiedAlbum | null);
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
  'artists'?: (_rhythmicity_search_api_SimplifiedArtist__Output)[];
  'album'?: (_rhythmicity_search_api_SimplifiedAlbum__Output);
  'lyrics'?: (string);
  'explicit'?: (boolean);
  'playCount'?: (Long);
  'durationMs'?: (number);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'images'?: (_rhythmicity_search_api_Image__Output)[];
  'type'?: (string);
}
