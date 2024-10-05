import path from "path";
import * as protoLoader from "@grpc/proto-loader";
import * as grpcLibrary from "@grpc/grpc-js";
import { ProtoGrpcType } from "../proto/gen/auth";

const protoDir = path.resolve(__dirname, "../proto/authServer");
const serverUrl = process.env.AUTH_SERVER_URL || "auth-server:50051";

const protoFile = `${protoDir}/auth.proto`;

const protoLoaderOptions: protoLoader.Options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(protoFile, protoLoaderOptions);
const authServerProto = (
    grpcLibrary.loadPackageDefinition(
        packageDefinition
    ) as unknown as ProtoGrpcType
).rhythmicity.auth_server;

export const authClient = new authServerProto.Auth(
    serverUrl,
    grpcLibrary.credentials.createInsecure()
);
