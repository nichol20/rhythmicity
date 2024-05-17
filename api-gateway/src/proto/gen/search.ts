import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { SearchClient as _rhythmicity_search_api_SearchClient, SearchDefinition as _rhythmicity_search_api_SearchDefinition } from './rhythmicity/search_api/Search';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  rhythmicity: {
    search_api: {
      Album: MessageTypeDefinition
      Artist: MessageTypeDefinition
      BestResult: MessageTypeDefinition
      Filters: MessageTypeDefinition
      Image: MessageTypeDefinition
      Search: SubtypeConstructor<typeof grpc.Client, _rhythmicity_search_api_SearchClient> & { service: _rhythmicity_search_api_SearchDefinition }
      SearchRequest: MessageTypeDefinition
      SearchResponse: MessageTypeDefinition
      SimplifiedAlbum: MessageTypeDefinition
      SimplifiedArtist: MessageTypeDefinition
      Track: MessageTypeDefinition
    }
  }
}

