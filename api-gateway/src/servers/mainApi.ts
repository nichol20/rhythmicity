import path from 'path'
import * as protoLoader from "@grpc/proto-loader"
import * as grpcLibrary from "@grpc/grpc-js"
import { ProtoGrpcType as AlbumProtoGrpcType } from '../proto/album'
import { ProtoGrpcType as TrackProtoGrpcType } from '../proto/track'
import { ProtoGrpcType as ArtistProtoGrpcType } from '../proto/artist'

type ProtoGrpcType = AlbumProtoGrpcType & TrackProtoGrpcType & ArtistProtoGrpcType

const protoDir = path.resolve(__dirname, '../proto')
const serverUrl = process.env.MAIN_API_URL || "http://localhost:50051"

const protoFiles = [
  `${protoDir}/album.proto`,
  `${protoDir}/artist.proto`,
  `${protoDir}/track.proto`,
  `${protoDir}/common.proto`,
]

const protoLoaderOptions: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}

const packageDefinition = protoLoader.loadSync(protoFiles, protoLoaderOptions)
const mainApiProto = ((grpcLibrary.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType).rhythmicity.main_api

export const albumClient = new mainApiProto.Album(serverUrl, grpcLibrary.credentials.createInsecure())
export const trackClient = new mainApiProto.Track(serverUrl, grpcLibrary.credentials.createInsecure())
export const artistClient = new mainApiProto.Artist(serverUrl, grpcLibrary.credentials.createInsecure())