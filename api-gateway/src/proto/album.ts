import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AlbumClient as _rhythmicity_main_api_AlbumClient, AlbumDefinition as _rhythmicity_main_api_AlbumDefinition } from './rhythmicity/main_api/Album';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  rhythmicity: {
    main_api: {
      Album: SubtypeConstructor<typeof grpc.Client, _rhythmicity_main_api_AlbumClient> & { service: _rhythmicity_main_api_AlbumDefinition }
      AlbumMessage: MessageTypeDefinition
      AlbumSpotify: MessageTypeDefinition
      Empty: MessageTypeDefinition
      GetPopularAlbumsRequest: MessageTypeDefinition
      Image: MessageTypeDefinition
      MultipleAlbums: MessageTypeDefinition
      RequestById: MessageTypeDefinition
      RequestByIds: MessageTypeDefinition
    }
  }
}

