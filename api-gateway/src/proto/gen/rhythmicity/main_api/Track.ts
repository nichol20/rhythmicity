// Original file: src/proto/mainApi/track.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetPopularTracksRequest as _rhythmicity_main_api_GetPopularTracksRequest, GetPopularTracksRequest__Output as _rhythmicity_main_api_GetPopularTracksRequest__Output } from '../../rhythmicity/main_api/GetPopularTracksRequest';
import type { MultipleTracks as _rhythmicity_main_api_MultipleTracks, MultipleTracks__Output as _rhythmicity_main_api_MultipleTracks__Output } from '../../rhythmicity/main_api/MultipleTracks';
import type { PlaybackResponse as _rhythmicity_main_api_PlaybackResponse, PlaybackResponse__Output as _rhythmicity_main_api_PlaybackResponse__Output } from '../../rhythmicity/main_api/PlaybackResponse';
import type { RequestById as _rhythmicity_main_api_RequestById, RequestById__Output as _rhythmicity_main_api_RequestById__Output } from '../../rhythmicity/main_api/RequestById';
import type { RequestByIds as _rhythmicity_main_api_RequestByIds, RequestByIds__Output as _rhythmicity_main_api_RequestByIds__Output } from '../../rhythmicity/main_api/RequestByIds';
import type { TrackMessage as _rhythmicity_main_api_TrackMessage, TrackMessage__Output as _rhythmicity_main_api_TrackMessage__Output } from '../../rhythmicity/main_api/TrackMessage';

export interface TrackClient extends grpc.Client {
  GetPopularTracks(argument: _rhythmicity_main_api_GetPopularTracksRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  GetPopularTracks(argument: _rhythmicity_main_api_GetPopularTracksRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  GetPopularTracks(argument: _rhythmicity_main_api_GetPopularTracksRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  GetPopularTracks(argument: _rhythmicity_main_api_GetPopularTracksRequest, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getPopularTracks(argument: _rhythmicity_main_api_GetPopularTracksRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getPopularTracks(argument: _rhythmicity_main_api_GetPopularTracksRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getPopularTracks(argument: _rhythmicity_main_api_GetPopularTracksRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getPopularTracks(argument: _rhythmicity_main_api_GetPopularTracksRequest, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  
  GetSeveralTracks(argument: _rhythmicity_main_api_RequestByIds, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  GetSeveralTracks(argument: _rhythmicity_main_api_RequestByIds, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  GetSeveralTracks(argument: _rhythmicity_main_api_RequestByIds, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  GetSeveralTracks(argument: _rhythmicity_main_api_RequestByIds, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getSeveralTracks(argument: _rhythmicity_main_api_RequestByIds, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getSeveralTracks(argument: _rhythmicity_main_api_RequestByIds, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getSeveralTracks(argument: _rhythmicity_main_api_RequestByIds, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getSeveralTracks(argument: _rhythmicity_main_api_RequestByIds, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  
  GetTrack(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_TrackMessage__Output>): grpc.ClientUnaryCall;
  GetTrack(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_TrackMessage__Output>): grpc.ClientUnaryCall;
  GetTrack(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_TrackMessage__Output>): grpc.ClientUnaryCall;
  GetTrack(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_TrackMessage__Output>): grpc.ClientUnaryCall;
  getTrack(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_TrackMessage__Output>): grpc.ClientUnaryCall;
  getTrack(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_TrackMessage__Output>): grpc.ClientUnaryCall;
  getTrack(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_TrackMessage__Output>): grpc.ClientUnaryCall;
  getTrack(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_TrackMessage__Output>): grpc.ClientUnaryCall;
  
  GetTracksByAlbumId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  GetTracksByAlbumId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  GetTracksByAlbumId(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  GetTracksByAlbumId(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getTracksByAlbumId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getTracksByAlbumId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getTracksByAlbumId(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getTracksByAlbumId(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  
  GetTracksByArtistId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  GetTracksByArtistId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  GetTracksByArtistId(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  GetTracksByArtistId(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getTracksByArtistId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getTracksByArtistId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getTracksByArtistId(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  getTracksByArtistId(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleTracks__Output>): grpc.ClientUnaryCall;
  
  Playback(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_PlaybackResponse__Output>): grpc.ClientUnaryCall;
  Playback(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_PlaybackResponse__Output>): grpc.ClientUnaryCall;
  Playback(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_PlaybackResponse__Output>): grpc.ClientUnaryCall;
  Playback(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_PlaybackResponse__Output>): grpc.ClientUnaryCall;
  playback(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_PlaybackResponse__Output>): grpc.ClientUnaryCall;
  playback(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_PlaybackResponse__Output>): grpc.ClientUnaryCall;
  playback(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_PlaybackResponse__Output>): grpc.ClientUnaryCall;
  playback(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_PlaybackResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface TrackHandlers extends grpc.UntypedServiceImplementation {
  GetPopularTracks: grpc.handleUnaryCall<_rhythmicity_main_api_GetPopularTracksRequest__Output, _rhythmicity_main_api_MultipleTracks>;
  
  GetSeveralTracks: grpc.handleUnaryCall<_rhythmicity_main_api_RequestByIds__Output, _rhythmicity_main_api_MultipleTracks>;
  
  GetTrack: grpc.handleUnaryCall<_rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_TrackMessage>;
  
  GetTracksByAlbumId: grpc.handleUnaryCall<_rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_MultipleTracks>;
  
  GetTracksByArtistId: grpc.handleUnaryCall<_rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_MultipleTracks>;
  
  Playback: grpc.handleUnaryCall<_rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_PlaybackResponse>;
  
}

export interface TrackDefinition extends grpc.ServiceDefinition {
  GetPopularTracks: MethodDefinition<_rhythmicity_main_api_GetPopularTracksRequest, _rhythmicity_main_api_MultipleTracks, _rhythmicity_main_api_GetPopularTracksRequest__Output, _rhythmicity_main_api_MultipleTracks__Output>
  GetSeveralTracks: MethodDefinition<_rhythmicity_main_api_RequestByIds, _rhythmicity_main_api_MultipleTracks, _rhythmicity_main_api_RequestByIds__Output, _rhythmicity_main_api_MultipleTracks__Output>
  GetTrack: MethodDefinition<_rhythmicity_main_api_RequestById, _rhythmicity_main_api_TrackMessage, _rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_TrackMessage__Output>
  GetTracksByAlbumId: MethodDefinition<_rhythmicity_main_api_RequestById, _rhythmicity_main_api_MultipleTracks, _rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_MultipleTracks__Output>
  GetTracksByArtistId: MethodDefinition<_rhythmicity_main_api_RequestById, _rhythmicity_main_api_MultipleTracks, _rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_MultipleTracks__Output>
  Playback: MethodDefinition<_rhythmicity_main_api_RequestById, _rhythmicity_main_api_PlaybackResponse, _rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_PlaybackResponse__Output>
}
