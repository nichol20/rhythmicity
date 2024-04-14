import path from "path";
import * as protoLoader from "@grpc/proto-loader";
import * as grpcLibrary from "@grpc/grpc-js";
import { ProtoGrpcType } from "../proto/gen/search";

const protoDir = path.resolve(__dirname, "../proto/searchApi");
const serverUrl = process.env.SEARCH_API_URL || "host.docker.internal:50051";

const protoFile = `${protoDir}/search.proto`;

const protoLoaderOptions: protoLoader.Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(protoFile, protoLoaderOptions);
const searchApiProto = (
  grpcLibrary.loadPackageDefinition(
    packageDefinition
  ) as unknown as ProtoGrpcType
).rhythmicity.search_api;

export const searchClient = new searchApiProto.Search(
  serverUrl,
  grpcLibrary.credentials.createInsecure()
);
