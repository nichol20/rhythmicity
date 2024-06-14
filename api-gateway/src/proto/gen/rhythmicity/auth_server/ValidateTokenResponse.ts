// Original file: src/proto/authServer/auth.proto

import type { User as _rhythmicity_auth_server_User, User__Output as _rhythmicity_auth_server_User__Output } from '../../rhythmicity/auth_server/User';

export interface ValidateTokenResponse {
  'user'?: (_rhythmicity_auth_server_User | null);
}

export interface ValidateTokenResponse__Output {
  'user'?: (_rhythmicity_auth_server_User__Output);
}
