import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthClient as _rhythmicity_auth_server_AuthClient, AuthDefinition as _rhythmicity_auth_server_AuthDefinition } from './rhythmicity/auth_server/Auth';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  rhythmicity: {
    auth_server: {
      Auth: SubtypeConstructor<typeof grpc.Client, _rhythmicity_auth_server_AuthClient> & { service: _rhythmicity_auth_server_AuthDefinition }
      SignInMessage: MessageTypeDefinition
      SignUpMessage: MessageTypeDefinition
      TokenMessage: MessageTypeDefinition
      User: MessageTypeDefinition
      ValidateTokenResponse: MessageTypeDefinition
    }
  }
}

