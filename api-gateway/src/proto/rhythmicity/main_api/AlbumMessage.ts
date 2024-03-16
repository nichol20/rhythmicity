// Original file: src/proto/album.proto

import type { AlbumSpotify as _rhythmicity_main_api_AlbumSpotify, AlbumSpotify__Output as _rhythmicity_main_api_AlbumSpotify__Output } from '../../rhythmicity/main_api/AlbumSpotify';

export interface AlbumMessage {
  'id'?: (string);
  'name'?: (string);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'totalTracks'?: (number);
  'spotify'?: (_rhythmicity_main_api_AlbumSpotify | null);
}

export interface AlbumMessage__Output {
  'id'?: (string);
  'name'?: (string);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'totalTracks'?: (number);
  'spotify'?: (_rhythmicity_main_api_AlbumSpotify__Output);
}
