// Original file: src/proto/mainApi/track.proto

import type { TrackSpotify as _rhythmicity_main_api_TrackSpotify, TrackSpotify__Output as _rhythmicity_main_api_TrackSpotify__Output } from '../../rhythmicity/main_api/TrackSpotify';
import type { Youtube as _rhythmicity_main_api_Youtube, Youtube__Output as _rhythmicity_main_api_Youtube__Output } from '../../rhythmicity/main_api/Youtube';
import type { SimplifiedAlbum as _rhythmicity_main_api_SimplifiedAlbum, SimplifiedAlbum__Output as _rhythmicity_main_api_SimplifiedAlbum__Output } from '../../rhythmicity/main_api/SimplifiedAlbum';
import type { SimplifiedArtist as _rhythmicity_main_api_SimplifiedArtist, SimplifiedArtist__Output as _rhythmicity_main_api_SimplifiedArtist__Output } from '../../rhythmicity/main_api/SimplifiedArtist';
import type { Long } from '@grpc/proto-loader';

export interface TrackMessage {
  'id'?: (string);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'explicit'?: (boolean);
  'playCount'?: (number | string | Long);
  'spotify'?: (_rhythmicity_main_api_TrackSpotify | null);
  'youtube'?: (_rhythmicity_main_api_Youtube | null);
  'lyrics'?: (string);
  'album'?: (_rhythmicity_main_api_SimplifiedAlbum | null);
  'artists'?: (_rhythmicity_main_api_SimplifiedArtist)[];
}

export interface TrackMessage__Output {
  'id'?: (string);
  'genres'?: (string)[];
  'styles'?: (string)[];
  'explicit'?: (boolean);
  'playCount'?: (Long);
  'spotify'?: (_rhythmicity_main_api_TrackSpotify__Output);
  'youtube'?: (_rhythmicity_main_api_Youtube__Output);
  'lyrics'?: (string);
  'album'?: (_rhythmicity_main_api_SimplifiedAlbum__Output);
  'artists'?: (_rhythmicity_main_api_SimplifiedArtist__Output)[];
}
