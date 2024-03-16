// Original file: src/proto/artist.proto

import type { ArtistSpotify as _rhythmicity_main_api_ArtistSpotify, ArtistSpotify__Output as _rhythmicity_main_api_ArtistSpotify__Output } from '../../rhythmicity/main_api/ArtistSpotify';

export interface ArtistMessage {
  'id'?: (string);
  'name'?: (string);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'spotify'?: (_rhythmicity_main_api_ArtistSpotify | null);
}

export interface ArtistMessage__Output {
  'id'?: (string);
  'name'?: (string);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'spotify'?: (_rhythmicity_main_api_ArtistSpotify__Output);
}
