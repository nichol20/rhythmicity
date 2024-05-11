import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ArtistClient as _rhythmicity_main_api_ArtistClient, ArtistDefinition as _rhythmicity_main_api_ArtistDefinition } from './rhythmicity/main_api/Artist';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  rhythmicity: {
    main_api: {
      Artist: SubtypeConstructor<typeof grpc.Client, _rhythmicity_main_api_ArtistClient> & { service: _rhythmicity_main_api_ArtistDefinition }
      ArtistMessage: MessageTypeDefinition
      ArtistSpotify: MessageTypeDefinition
      Empty: MessageTypeDefinition
      GetPopularArtistsRequest: MessageTypeDefinition
      Image: MessageTypeDefinition
      MultipleArtists: MessageTypeDefinition
      RequestById: MessageTypeDefinition
      RequestByIds: MessageTypeDefinition
      SimplifiedArtist: MessageTypeDefinition
    }
  }
}

