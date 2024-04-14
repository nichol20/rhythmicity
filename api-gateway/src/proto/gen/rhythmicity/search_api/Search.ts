// Original file: src/proto/searchApi/search.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { SearchRequest as _rhythmicity_search_api_SearchRequest, SearchRequest__Output as _rhythmicity_search_api_SearchRequest__Output } from '../../rhythmicity/search_api/SearchRequest';
import type { SearchResponse as _rhythmicity_search_api_SearchResponse, SearchResponse__Output as _rhythmicity_search_api_SearchResponse__Output } from '../../rhythmicity/search_api/SearchResponse';

export interface SearchClient extends grpc.Client {
  Search(argument: _rhythmicity_search_api_SearchRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_search_api_SearchResponse__Output>): grpc.ClientUnaryCall;
  Search(argument: _rhythmicity_search_api_SearchRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_search_api_SearchResponse__Output>): grpc.ClientUnaryCall;
  Search(argument: _rhythmicity_search_api_SearchRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_search_api_SearchResponse__Output>): grpc.ClientUnaryCall;
  Search(argument: _rhythmicity_search_api_SearchRequest, callback: grpc.requestCallback<_rhythmicity_search_api_SearchResponse__Output>): grpc.ClientUnaryCall;
  search(argument: _rhythmicity_search_api_SearchRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_search_api_SearchResponse__Output>): grpc.ClientUnaryCall;
  search(argument: _rhythmicity_search_api_SearchRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_search_api_SearchResponse__Output>): grpc.ClientUnaryCall;
  search(argument: _rhythmicity_search_api_SearchRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_search_api_SearchResponse__Output>): grpc.ClientUnaryCall;
  search(argument: _rhythmicity_search_api_SearchRequest, callback: grpc.requestCallback<_rhythmicity_search_api_SearchResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface SearchHandlers extends grpc.UntypedServiceImplementation {
  Search: grpc.handleUnaryCall<_rhythmicity_search_api_SearchRequest__Output, _rhythmicity_search_api_SearchResponse>;
  
}

export interface SearchDefinition extends grpc.ServiceDefinition {
  Search: MethodDefinition<_rhythmicity_search_api_SearchRequest, _rhythmicity_search_api_SearchResponse, _rhythmicity_search_api_SearchRequest__Output, _rhythmicity_search_api_SearchResponse__Output>
}
