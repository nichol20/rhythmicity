// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v3.12.4
// source: track.proto

package pb

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	Track_Playback_FullMethodName = "/Track/Playback"
)

// TrackClient is the client API for Track service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type TrackClient interface {
	Playback(ctx context.Context, in *PlaybackRequest, opts ...grpc.CallOption) (*PlaybackResponse, error)
}

type trackClient struct {
	cc grpc.ClientConnInterface
}

func NewTrackClient(cc grpc.ClientConnInterface) TrackClient {
	return &trackClient{cc}
}

func (c *trackClient) Playback(ctx context.Context, in *PlaybackRequest, opts ...grpc.CallOption) (*PlaybackResponse, error) {
	out := new(PlaybackResponse)
	err := c.cc.Invoke(ctx, Track_Playback_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// TrackServer is the server API for Track service.
// All implementations must embed UnimplementedTrackServer
// for forward compatibility
type TrackServer interface {
	Playback(context.Context, *PlaybackRequest) (*PlaybackResponse, error)
	mustEmbedUnimplementedTrackServer()
}

// UnimplementedTrackServer must be embedded to have forward compatible implementations.
type UnimplementedTrackServer struct {
}

func (UnimplementedTrackServer) Playback(context.Context, *PlaybackRequest) (*PlaybackResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Playback not implemented")
}
func (UnimplementedTrackServer) mustEmbedUnimplementedTrackServer() {}

// UnsafeTrackServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to TrackServer will
// result in compilation errors.
type UnsafeTrackServer interface {
	mustEmbedUnimplementedTrackServer()
}

func RegisterTrackServer(s grpc.ServiceRegistrar, srv TrackServer) {
	s.RegisterService(&Track_ServiceDesc, srv)
}

func _Track_Playback_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PlaybackRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TrackServer).Playback(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Track_Playback_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TrackServer).Playback(ctx, req.(*PlaybackRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Track_ServiceDesc is the grpc.ServiceDesc for Track service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Track_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "Track",
	HandlerType: (*TrackServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Playback",
			Handler:    _Track_Playback_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "track.proto",
}
