// Original file: src/proto/searchApi/search.proto

import type { BestResult as _rhythmicity_search_api_BestResult, BestResult__Output as _rhythmicity_search_api_BestResult__Output } from '../../rhythmicity/search_api/BestResult';
import type { Track as _rhythmicity_search_api_Track, Track__Output as _rhythmicity_search_api_Track__Output } from '../../rhythmicity/search_api/Track';
import type { Artist as _rhythmicity_search_api_Artist, Artist__Output as _rhythmicity_search_api_Artist__Output } from '../../rhythmicity/search_api/Artist';
import type { Album as _rhythmicity_search_api_Album, Album__Output as _rhythmicity_search_api_Album__Output } from '../../rhythmicity/search_api/Album';

export interface SearchResponse {
  'bestResult'?: (_rhythmicity_search_api_BestResult | null);
  'tracks'?: (_rhythmicity_search_api_Track)[];
  'artists'?: (_rhythmicity_search_api_Artist)[];
  'albums'?: (_rhythmicity_search_api_Album)[];
}

export interface SearchResponse__Output {
  'bestResult'?: (_rhythmicity_search_api_BestResult__Output);
  'tracks'?: (_rhythmicity_search_api_Track__Output)[];
  'artists'?: (_rhythmicity_search_api_Artist__Output)[];
  'albums'?: (_rhythmicity_search_api_Album__Output)[];
}
