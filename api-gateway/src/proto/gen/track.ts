import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AlbumClient as _rhythmicity_main_api_AlbumClient, AlbumDefinition as _rhythmicity_main_api_AlbumDefinition } from './rhythmicity/main_api/Album';
import type { ArtistClient as _rhythmicity_main_api_ArtistClient, ArtistDefinition as _rhythmicity_main_api_ArtistDefinition } from './rhythmicity/main_api/Artist';
import type { TrackClient as _rhythmicity_main_api_TrackClient, TrackDefinition as _rhythmicity_main_api_TrackDefinition } from './rhythmicity/main_api/Track';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  rhythmicity: {
    main_api: {
      Album: SubtypeConstructor<typeof grpc.Client, _rhythmicity_main_api_AlbumClient> & { service: _rhythmicity_main_api_AlbumDefinition }
      AlbumMessage: MessageTypeDefinition
      AlbumSpotify: MessageTypeDefinition
      Artist: SubtypeConstructor<typeof grpc.Client, _rhythmicity_main_api_ArtistClient> & { service: _rhythmicity_main_api_ArtistDefinition }
      ArtistMessage: MessageTypeDefinition
      ArtistSpotify: MessageTypeDefinition
      Empty: MessageTypeDefinition
      GetPopularAlbumsRequest: MessageTypeDefinition
      GetPopularArtistsRequest: MessageTypeDefinition
      GetPopularTracksRequest: MessageTypeDefinition
      GetTracksByAlbumIdRequest: MessageTypeDefinition
      GetTracksByArtistIdRequest: MessageTypeDefinition
      Image: MessageTypeDefinition
      MultipleAlbums: MessageTypeDefinition
      MultipleArtists: MessageTypeDefinition
      MultipleTracks: MessageTypeDefinition
      PlaybackResponse: MessageTypeDefinition
      RequestById: MessageTypeDefinition
      RequestByIds: MessageTypeDefinition
      SimplifiedAlbum: MessageTypeDefinition
      SimplifiedArtist: MessageTypeDefinition
      Track: SubtypeConstructor<typeof grpc.Client, _rhythmicity_main_api_TrackClient> & { service: _rhythmicity_main_api_TrackDefinition }
      TrackMessage: MessageTypeDefinition
      TrackSpotify: MessageTypeDefinition
      Youtube: MessageTypeDefinition
      YoutubeStatistics: MessageTypeDefinition
      YoutubeThumbnails: MessageTypeDefinition
    }
  }
}

