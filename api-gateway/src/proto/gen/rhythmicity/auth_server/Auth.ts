// Original file: src/proto/authServer/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { SignInMessage as _rhythmicity_auth_server_SignInMessage, SignInMessage__Output as _rhythmicity_auth_server_SignInMessage__Output } from '../../rhythmicity/auth_server/SignInMessage';
import type { SignUpMessage as _rhythmicity_auth_server_SignUpMessage, SignUpMessage__Output as _rhythmicity_auth_server_SignUpMessage__Output } from '../../rhythmicity/auth_server/SignUpMessage';
import type { TokenMessage as _rhythmicity_auth_server_TokenMessage, TokenMessage__Output as _rhythmicity_auth_server_TokenMessage__Output } from '../../rhythmicity/auth_server/TokenMessage';
import type { User as _rhythmicity_auth_server_User, User__Output as _rhythmicity_auth_server_User__Output } from '../../rhythmicity/auth_server/User';
import type { ValidateTokenResponse as _rhythmicity_auth_server_ValidateTokenResponse, ValidateTokenResponse__Output as _rhythmicity_auth_server_ValidateTokenResponse__Output } from '../../rhythmicity/auth_server/ValidateTokenResponse';

export interface AuthClient extends grpc.Client {
  SignIn(argument: _rhythmicity_auth_server_SignInMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_auth_server_TokenMessage__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _rhythmicity_auth_server_SignInMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_auth_server_TokenMessage__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _rhythmicity_auth_server_SignInMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_auth_server_TokenMessage__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _rhythmicity_auth_server_SignInMessage, callback: grpc.requestCallback<_rhythmicity_auth_server_TokenMessage__Output>): grpc.ClientUnaryCall;
  signIn(argument: _rhythmicity_auth_server_SignInMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_auth_server_TokenMessage__Output>): grpc.ClientUnaryCall;
  signIn(argument: _rhythmicity_auth_server_SignInMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_auth_server_TokenMessage__Output>): grpc.ClientUnaryCall;
  signIn(argument: _rhythmicity_auth_server_SignInMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_auth_server_TokenMessage__Output>): grpc.ClientUnaryCall;
  signIn(argument: _rhythmicity_auth_server_SignInMessage, callback: grpc.requestCallback<_rhythmicity_auth_server_TokenMessage__Output>): grpc.ClientUnaryCall;
  
  SignUp(argument: _rhythmicity_auth_server_SignUpMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_auth_server_User__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _rhythmicity_auth_server_SignUpMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_auth_server_User__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _rhythmicity_auth_server_SignUpMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_auth_server_User__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _rhythmicity_auth_server_SignUpMessage, callback: grpc.requestCallback<_rhythmicity_auth_server_User__Output>): grpc.ClientUnaryCall;
  signUp(argument: _rhythmicity_auth_server_SignUpMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_auth_server_User__Output>): grpc.ClientUnaryCall;
  signUp(argument: _rhythmicity_auth_server_SignUpMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_auth_server_User__Output>): grpc.ClientUnaryCall;
  signUp(argument: _rhythmicity_auth_server_SignUpMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_auth_server_User__Output>): grpc.ClientUnaryCall;
  signUp(argument: _rhythmicity_auth_server_SignUpMessage, callback: grpc.requestCallback<_rhythmicity_auth_server_User__Output>): grpc.ClientUnaryCall;
  
  ValidateToken(argument: _rhythmicity_auth_server_TokenMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_auth_server_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _rhythmicity_auth_server_TokenMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_auth_server_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _rhythmicity_auth_server_TokenMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_auth_server_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateToken(argument: _rhythmicity_auth_server_TokenMessage, callback: grpc.requestCallback<_rhythmicity_auth_server_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _rhythmicity_auth_server_TokenMessage, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_auth_server_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _rhythmicity_auth_server_TokenMessage, metadata: grpc.Metadata, callback: grpc.requestCallback<_rhythmicity_auth_server_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _rhythmicity_auth_server_TokenMessage, options: grpc.CallOptions, callback: grpc.requestCallback<_rhythmicity_auth_server_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateToken(argument: _rhythmicity_auth_server_TokenMessage, callback: grpc.requestCallback<_rhythmicity_auth_server_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthHandlers extends grpc.UntypedServiceImplementation {
  SignIn: grpc.handleUnaryCall<_rhythmicity_auth_server_SignInMessage__Output, _rhythmicity_auth_server_TokenMessage>;
  
  SignUp: grpc.handleUnaryCall<_rhythmicity_auth_server_SignUpMessage__Output, _rhythmicity_auth_server_User>;
  
  ValidateToken: grpc.handleUnaryCall<_rhythmicity_auth_server_TokenMessage__Output, _rhythmicity_auth_server_ValidateTokenResponse>;
  
}

export interface AuthDefinition extends grpc.ServiceDefinition {
  SignIn: MethodDefinition<_rhythmicity_auth_server_SignInMessage, _rhythmicity_auth_server_TokenMessage, _rhythmicity_auth_server_SignInMessage__Output, _rhythmicity_auth_server_TokenMessage__Output>
  SignUp: MethodDefinition<_rhythmicity_auth_server_SignUpMessage, _rhythmicity_auth_server_User, _rhythmicity_auth_server_SignUpMessage__Output, _rhythmicity_auth_server_User__Output>
  ValidateToken: MethodDefinition<_rhythmicity_auth_server_TokenMessage, _rhythmicity_auth_server_ValidateTokenResponse, _rhythmicity_auth_server_TokenMessage__Output, _rhythmicity_auth_server_ValidateTokenResponse__Output>
}
