// Original file: src/proto/mainApi/album.proto

import type { AlbumSpotify as _rhythmicity_main_api_AlbumSpotify, AlbumSpotify__Output as _rhythmicity_main_api_AlbumSpotify__Output } from '../../rhythmicity/main_api/AlbumSpotify';
import type { SimplifiedArtist as _rhythmicity_main_api_SimplifiedArtist, SimplifiedArtist__Output as _rhythmicity_main_api_SimplifiedArtist__Output } from '../../rhythmicity/main_api/SimplifiedArtist';

export interface AlbumMessage {
  'id'?: (string);
  'name'?: (string);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'totalTracks'?: (number);
  'spotify'?: (_rhythmicity_main_api_AlbumSpotify | null);
  'artists'?: (_rhythmicity_main_api_SimplifiedArtist)[];
}

export interface AlbumMessage__Output {
  'id'?: (string);
  'name'?: (string);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'totalTracks'?: (number);
  'spotify'?: (_rhythmicity_main_api_AlbumSpotify__Output);
  'artists'?: (_rhythmicity_main_api_SimplifiedArtist__Output)[];
}
