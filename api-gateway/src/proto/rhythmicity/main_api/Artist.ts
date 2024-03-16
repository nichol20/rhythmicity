// Original file: src/proto/artist.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ArtistMessage as _rhythmicity_main_api_ArtistMessage, ArtistMessage__Output as _rhythmicity_main_api_ArtistMessage__Output } from '../../rhythmicity/main_api/ArtistMessage';
import type { GetPopularArtistsRequest as _rhythmicity_main_api_GetPopularArtistsRequest, GetPopularArtistsRequest__Output as _rhythmicity_main_api_GetPopularArtistsRequest__Output } from '../../rhythmicity/main_api/GetPopularArtistsRequest';
import type { MultipleArtists as _rhythmicity_main_api_MultipleArtists, MultipleArtists__Output as _rhythmicity_main_api_MultipleArtists__Output } from '../../rhythmicity/main_api/MultipleArtists';
import type { RequestById as _rhythmicity_main_api_RequestById, RequestById__Output as _rhythmicity_main_api_RequestById__Output } from '../../rhythmicity/main_api/RequestById';
import type { RequestByIds as _rhythmicity_main_api_RequestByIds, RequestByIds__Output as _rhythmicity_main_api_RequestByIds__Output } from '../../rhythmicity/main_api/RequestByIds';

export interface ArtistClient extends grpc.Client {
  GetArtist(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_ArtistMessage__Output>): grpc.ClientUnaryCall;
  GetArtist(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_ArtistMessage__Output>): grpc.ClientUnaryCall;
  GetArtist(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_ArtistMessage__Output>): grpc.ClientUnaryCall;
  GetArtist(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_ArtistMessage__Output>): grpc.ClientUnaryCall;
  getArtist(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_ArtistMessage__Output>): grpc.ClientUnaryCall;
  getArtist(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_ArtistMessage__Output>): grpc.ClientUnaryCall;
  getArtist(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_ArtistMessage__Output>): grpc.ClientUnaryCall;
  getArtist(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_ArtistMessage__Output>): grpc.ClientUnaryCall;
  
  GetArtistsByAlbumId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  GetArtistsByAlbumId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  GetArtistsByAlbumId(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  GetArtistsByAlbumId(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getArtistsByAlbumId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getArtistsByAlbumId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getArtistsByAlbumId(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getArtistsByAlbumId(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  
  GetArtistsByTrackId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  GetArtistsByTrackId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  GetArtistsByTrackId(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  GetArtistsByTrackId(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getArtistsByTrackId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getArtistsByTrackId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getArtistsByTrackId(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getArtistsByTrackId(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  
  GetPopularArtists(argument: _rhythmicity_main_api_GetPopularArtistsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  GetPopularArtists(argument: _rhythmicity_main_api_GetPopularArtistsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  GetPopularArtists(argument: _rhythmicity_main_api_GetPopularArtistsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  GetPopularArtists(argument: _rhythmicity_main_api_GetPopularArtistsRequest, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getPopularArtists(argument: _rhythmicity_main_api_GetPopularArtistsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getPopularArtists(argument: _rhythmicity_main_api_GetPopularArtistsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getPopularArtists(argument: _rhythmicity_main_api_GetPopularArtistsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getPopularArtists(argument: _rhythmicity_main_api_GetPopularArtistsRequest, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  
  GetSeveralArtists(argument: _rhythmicity_main_api_RequestByIds, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  GetSeveralArtists(argument: _rhythmicity_main_api_RequestByIds, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  GetSeveralArtists(argument: _rhythmicity_main_api_RequestByIds, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  GetSeveralArtists(argument: _rhythmicity_main_api_RequestByIds, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getSeveralArtists(argument: _rhythmicity_main_api_RequestByIds, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getSeveralArtists(argument: _rhythmicity_main_api_RequestByIds, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getSeveralArtists(argument: _rhythmicity_main_api_RequestByIds, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  getSeveralArtists(argument: _rhythmicity_main_api_RequestByIds, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleArtists__Output>): grpc.ClientUnaryCall;
  
}

export interface ArtistHandlers extends grpc.UntypedServiceImplementation {
  GetArtist: grpc.handleUnaryCall<_rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_ArtistMessage>;
  
  GetArtistsByAlbumId: grpc.handleUnaryCall<_rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_MultipleArtists>;
  
  GetArtistsByTrackId: grpc.handleUnaryCall<_rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_MultipleArtists>;
  
  GetPopularArtists: grpc.handleUnaryCall<_rhythmicity_main_api_GetPopularArtistsRequest__Output, _rhythmicity_main_api_MultipleArtists>;
  
  GetSeveralArtists: grpc.handleUnaryCall<_rhythmicity_main_api_RequestByIds__Output, _rhythmicity_main_api_MultipleArtists>;
  
}

export interface ArtistDefinition extends grpc.ServiceDefinition {
  GetArtist: MethodDefinition<_rhythmicity_main_api_RequestById, _rhythmicity_main_api_ArtistMessage, _rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_ArtistMessage__Output>
  GetArtistsByAlbumId: MethodDefinition<_rhythmicity_main_api_RequestById, _rhythmicity_main_api_MultipleArtists, _rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_MultipleArtists__Output>
  GetArtistsByTrackId: MethodDefinition<_rhythmicity_main_api_RequestById, _rhythmicity_main_api_MultipleArtists, _rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_MultipleArtists__Output>
  GetPopularArtists: MethodDefinition<_rhythmicity_main_api_GetPopularArtistsRequest, _rhythmicity_main_api_MultipleArtists, _rhythmicity_main_api_GetPopularArtistsRequest__Output, _rhythmicity_main_api_MultipleArtists__Output>
  GetSeveralArtists: MethodDefinition<_rhythmicity_main_api_RequestByIds, _rhythmicity_main_api_MultipleArtists, _rhythmicity_main_api_RequestByIds__Output, _rhythmicity_main_api_MultipleArtists__Output>
}
