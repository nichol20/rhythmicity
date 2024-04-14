import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { TrackClient as _rhythmicity_main_api_TrackClient, TrackDefinition as _rhythmicity_main_api_TrackDefinition } from './rhythmicity/main_api/Track';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  rhythmicity: {
    main_api: {
      Empty: MessageTypeDefinition
      GetPopularTracksRequest: MessageTypeDefinition
      Image: MessageTypeDefinition
      MultipleTracks: MessageTypeDefinition
      PlaybackResponse: MessageTypeDefinition
      RequestById: MessageTypeDefinition
      RequestByIds: MessageTypeDefinition
      Track: SubtypeConstructor<typeof grpc.Client, _rhythmicity_main_api_TrackClient> & { service: _rhythmicity_main_api_TrackDefinition }
      TrackMessage: MessageTypeDefinition
      TrackSpotify: MessageTypeDefinition
      Youtube: MessageTypeDefinition
      YoutubeStatistics: MessageTypeDefinition
      YoutubeThumbnails: MessageTypeDefinition
    }
  }
}

