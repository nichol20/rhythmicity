// Original file: src/proto/album.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AlbumMessage as _rhythmicity_main_api_AlbumMessage, AlbumMessage__Output as _rhythmicity_main_api_AlbumMessage__Output } from '../../rhythmicity/main_api/AlbumMessage';
import type { GetPopularAlbumsRequest as _rhythmicity_main_api_GetPopularAlbumsRequest, GetPopularAlbumsRequest__Output as _rhythmicity_main_api_GetPopularAlbumsRequest__Output } from '../../rhythmicity/main_api/GetPopularAlbumsRequest';
import type { MultipleAlbums as _rhythmicity_main_api_MultipleAlbums, MultipleAlbums__Output as _rhythmicity_main_api_MultipleAlbums__Output } from '../../rhythmicity/main_api/MultipleAlbums';
import type { RequestById as _rhythmicity_main_api_RequestById, RequestById__Output as _rhythmicity_main_api_RequestById__Output } from '../../rhythmicity/main_api/RequestById';
import type { RequestByIds as _rhythmicity_main_api_RequestByIds, RequestByIds__Output as _rhythmicity_main_api_RequestByIds__Output } from '../../rhythmicity/main_api/RequestByIds';

export interface AlbumClient extends grpc.Client {
  GetAlbum(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  GetAlbum(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  GetAlbum(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  GetAlbum(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  getAlbum(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  getAlbum(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  getAlbum(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  getAlbum(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  
  GetAlbumByTrackId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  GetAlbumByTrackId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  GetAlbumByTrackId(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  GetAlbumByTrackId(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  getAlbumByTrackId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  getAlbumByTrackId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  getAlbumByTrackId(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  getAlbumByTrackId(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_AlbumMessage__Output>): grpc.ClientUnaryCall;
  
  GetAlbumsByArtistId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  GetAlbumsByArtistId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  GetAlbumsByArtistId(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  GetAlbumsByArtistId(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  getAlbumsByArtistId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  getAlbumsByArtistId(argument: _rhythmicity_main_api_RequestById, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  getAlbumsByArtistId(argument: _rhythmicity_main_api_RequestById, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  getAlbumsByArtistId(argument: _rhythmicity_main_api_RequestById, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  
  GetPopularAlbums(argument: _rhythmicity_main_api_GetPopularAlbumsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  GetPopularAlbums(argument: _rhythmicity_main_api_GetPopularAlbumsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  GetPopularAlbums(argument: _rhythmicity_main_api_GetPopularAlbumsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  GetPopularAlbums(argument: _rhythmicity_main_api_GetPopularAlbumsRequest, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  getPopularAlbums(argument: _rhythmicity_main_api_GetPopularAlbumsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  getPopularAlbums(argument: _rhythmicity_main_api_GetPopularAlbumsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  getPopularAlbums(argument: _rhythmicity_main_api_GetPopularAlbumsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  getPopularAlbums(argument: _rhythmicity_main_api_GetPopularAlbumsRequest, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  
  GetSeveralAlbums(argument: _rhythmicity_main_api_RequestByIds, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  GetSeveralAlbums(argument: _rhythmicity_main_api_RequestByIds, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  GetSeveralAlbums(argument: _rhythmicity_main_api_RequestByIds, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  GetSeveralAlbums(argument: _rhythmicity_main_api_RequestByIds, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  getSeveralAlbums(argument: _rhythmicity_main_api_RequestByIds, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  getSeveralAlbums(argument: _rhythmicity_main_api_RequestByIds, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  getSeveralAlbums(argument: _rhythmicity_main_api_RequestByIds, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  getSeveralAlbums(argument: _rhythmicity_main_api_RequestByIds, callback: grpc.requestCallback<_rhythmicity_main_api_MultipleAlbums__Output>): grpc.ClientUnaryCall;
  
}

export interface AlbumHandlers extends grpc.UntypedServiceImplementation {
  GetAlbum: grpc.handleUnaryCall<_rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_AlbumMessage>;
  
  GetAlbumByTrackId: grpc.handleUnaryCall<_rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_AlbumMessage>;
  
  GetAlbumsByArtistId: grpc.handleUnaryCall<_rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_MultipleAlbums>;
  
  GetPopularAlbums: grpc.handleUnaryCall<_rhythmicity_main_api_GetPopularAlbumsRequest__Output, _rhythmicity_main_api_MultipleAlbums>;
  
  GetSeveralAlbums: grpc.handleUnaryCall<_rhythmicity_main_api_RequestByIds__Output, _rhythmicity_main_api_MultipleAlbums>;
  
}

export interface AlbumDefinition extends grpc.ServiceDefinition {
  GetAlbum: MethodDefinition<_rhythmicity_main_api_RequestById, _rhythmicity_main_api_AlbumMessage, _rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_AlbumMessage__Output>
  GetAlbumByTrackId: MethodDefinition<_rhythmicity_main_api_RequestById, _rhythmicity_main_api_AlbumMessage, _rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_AlbumMessage__Output>
  GetAlbumsByArtistId: MethodDefinition<_rhythmicity_main_api_RequestById, _rhythmicity_main_api_MultipleAlbums, _rhythmicity_main_api_RequestById__Output, _rhythmicity_main_api_MultipleAlbums__Output>
  GetPopularAlbums: MethodDefinition<_rhythmicity_main_api_GetPopularAlbumsRequest, _rhythmicity_main_api_MultipleAlbums, _rhythmicity_main_api_GetPopularAlbumsRequest__Output, _rhythmicity_main_api_MultipleAlbums__Output>
  GetSeveralAlbums: MethodDefinition<_rhythmicity_main_api_RequestByIds, _rhythmicity_main_api_MultipleAlbums, _rhythmicity_main_api_RequestByIds__Output, _rhythmicity_main_api_MultipleAlbums__Output>
}
