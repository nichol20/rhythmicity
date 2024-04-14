// Original file: src/proto/searchApi/search.proto

import type { Filters as _rhythmicity_search_api_Filters, Filters__Output as _rhythmicity_search_api_Filters__Output } from '../../rhythmicity/search_api/Filters';

// Original file: src/proto/searchApi/search.proto

export const _rhythmicity_search_api_SearchRequest_Kind = {
  ALL: 0,
  ARTISTS: 1,
  ALBUMS: 2,
  TRACKS: 3,
} as const;

export type _rhythmicity_search_api_SearchRequest_Kind =
  | 'ALL'
  | 0
  | 'ARTISTS'
  | 1
  | 'ALBUMS'
  | 2
  | 'TRACKS'
  | 3

export type _rhythmicity_search_api_SearchRequest_Kind__Output = typeof _rhythmicity_search_api_SearchRequest_Kind[keyof typeof _rhythmicity_search_api_SearchRequest_Kind]

export interface SearchRequest {
  'query'?: (string);
  'offset'?: (number);
  'limit'?: (number);
  'kind'?: (_rhythmicity_search_api_SearchRequest_Kind);
  'filters'?: (_rhythmicity_search_api_Filters | null);
  '_offset'?: "offset";
  '_limit'?: "limit";
  '_kind'?: "kind";
  '_filters'?: "filters";
}

export interface SearchRequest__Output {
  'query'?: (string);
  'offset'?: (number);
  'limit'?: (number);
  'kind'?: (_rhythmicity_search_api_SearchRequest_Kind__Output);
  'filters'?: (_rhythmicity_search_api_Filters__Output);
}
