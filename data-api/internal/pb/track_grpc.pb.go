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
	Track_Playback_FullMethodName            = "/Track/Playback"
	Track_GetPopularTracks_FullMethodName    = "/Track/GetPopularTracks"
	Track_GetTrack_FullMethodName            = "/Track/GetTrack"
	Track_GetTracksByArtistId_FullMethodName = "/Track/GetTracksByArtistId"
	Track_GetTracksByAlbumId_FullMethodName  = "/Track/GetTracksByAlbumId"
)

// TrackClient is the client API for Track service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type TrackClient interface {
	Playback(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*PlaybackResponse, error)
	GetPopularTracks(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*MultipleTracks, error)
	GetTrack(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*TrackMessage, error)
	GetTracksByArtistId(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*TrackMessage, error)
	GetTracksByAlbumId(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*TrackMessage, error)
}

type trackClient struct {
	cc grpc.ClientConnInterface
}

func NewTrackClient(cc grpc.ClientConnInterface) TrackClient {
	return &trackClient{cc}
}

func (c *trackClient) Playback(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*PlaybackResponse, error) {
	out := new(PlaybackResponse)
	err := c.cc.Invoke(ctx, Track_Playback_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *trackClient) GetPopularTracks(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*MultipleTracks, error) {
	out := new(MultipleTracks)
	err := c.cc.Invoke(ctx, Track_GetPopularTracks_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *trackClient) GetTrack(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*TrackMessage, error) {
	out := new(TrackMessage)
	err := c.cc.Invoke(ctx, Track_GetTrack_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *trackClient) GetTracksByArtistId(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*TrackMessage, error) {
	out := new(TrackMessage)
	err := c.cc.Invoke(ctx, Track_GetTracksByArtistId_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *trackClient) GetTracksByAlbumId(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*TrackMessage, error) {
	out := new(TrackMessage)
	err := c.cc.Invoke(ctx, Track_GetTracksByAlbumId_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// TrackServer is the server API for Track service.
// All implementations must embed UnimplementedTrackServer
// for forward compatibility
type TrackServer interface {
	Playback(context.Context, *RequestById) (*PlaybackResponse, error)
	GetPopularTracks(context.Context, *Empty) (*MultipleTracks, error)
	GetTrack(context.Context, *RequestById) (*TrackMessage, error)
	GetTracksByArtistId(context.Context, *RequestById) (*TrackMessage, error)
	GetTracksByAlbumId(context.Context, *RequestById) (*TrackMessage, error)
	mustEmbedUnimplementedTrackServer()
}

// UnimplementedTrackServer must be embedded to have forward compatible implementations.
type UnimplementedTrackServer struct {
}

func (UnimplementedTrackServer) Playback(context.Context, *RequestById) (*PlaybackResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Playback not implemented")
}
func (UnimplementedTrackServer) GetPopularTracks(context.Context, *Empty) (*MultipleTracks, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetPopularTracks not implemented")
}
func (UnimplementedTrackServer) GetTrack(context.Context, *RequestById) (*TrackMessage, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTrack not implemented")
}
func (UnimplementedTrackServer) GetTracksByArtistId(context.Context, *RequestById) (*TrackMessage, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTracksByArtistId not implemented")
}
func (UnimplementedTrackServer) GetTracksByAlbumId(context.Context, *RequestById) (*TrackMessage, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTracksByAlbumId not implemented")
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
	in := new(RequestById)
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
		return srv.(TrackServer).Playback(ctx, req.(*RequestById))
	}
	return interceptor(ctx, in, info, handler)
}

func _Track_GetPopularTracks_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TrackServer).GetPopularTracks(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Track_GetPopularTracks_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TrackServer).GetPopularTracks(ctx, req.(*Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _Track_GetTrack_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RequestById)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TrackServer).GetTrack(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Track_GetTrack_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TrackServer).GetTrack(ctx, req.(*RequestById))
	}
	return interceptor(ctx, in, info, handler)
}

func _Track_GetTracksByArtistId_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RequestById)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TrackServer).GetTracksByArtistId(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Track_GetTracksByArtistId_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TrackServer).GetTracksByArtistId(ctx, req.(*RequestById))
	}
	return interceptor(ctx, in, info, handler)
}

func _Track_GetTracksByAlbumId_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RequestById)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TrackServer).GetTracksByAlbumId(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Track_GetTracksByAlbumId_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TrackServer).GetTracksByAlbumId(ctx, req.(*RequestById))
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
		{
			MethodName: "GetPopularTracks",
			Handler:    _Track_GetPopularTracks_Handler,
		},
		{
			MethodName: "GetTrack",
			Handler:    _Track_GetTrack_Handler,
		},
		{
			MethodName: "GetTracksByArtistId",
			Handler:    _Track_GetTracksByArtistId_Handler,
		},
		{
			MethodName: "GetTracksByAlbumId",
			Handler:    _Track_GetTracksByAlbumId_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "track.proto",
}
