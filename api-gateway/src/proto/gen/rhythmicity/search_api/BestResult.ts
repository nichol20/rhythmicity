// Original file: src/proto/searchApi/search.proto

import type { Track as _rhythmicity_search_api_Track, Track__Output as _rhythmicity_search_api_Track__Output } from '../../rhythmicity/search_api/Track';
import type { Artist as _rhythmicity_search_api_Artist, Artist__Output as _rhythmicity_search_api_Artist__Output } from '../../rhythmicity/search_api/Artist';
import type { Album as _rhythmicity_search_api_Album, Album__Output as _rhythmicity_search_api_Album__Output } from '../../rhythmicity/search_api/Album';

export interface BestResult {
  'track'?: (_rhythmicity_search_api_Track | null);
  'artist'?: (_rhythmicity_search_api_Artist | null);
  'album'?: (_rhythmicity_search_api_Album | null);
  'type'?: "track"|"artist"|"album";
}

export interface BestResult__Output {
  'track'?: (_rhythmicity_search_api_Track__Output);
  'artist'?: (_rhythmicity_search_api_Artist__Output);
  'album'?: (_rhythmicity_search_api_Album__Output);
}
