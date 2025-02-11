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
	Track_Playback_FullMethodName            = "/rhythmicity.main_api.Track/Playback"
	Track_GetPopularTracks_FullMethodName    = "/rhythmicity.main_api.Track/GetPopularTracks"
	Track_GetTrack_FullMethodName            = "/rhythmicity.main_api.Track/GetTrack"
	Track_GetSeveralTracks_FullMethodName    = "/rhythmicity.main_api.Track/GetSeveralTracks"
	Track_GetTracksByArtistId_FullMethodName = "/rhythmicity.main_api.Track/GetTracksByArtistId"
	Track_GetTracksByAlbumId_FullMethodName  = "/rhythmicity.main_api.Track/GetTracksByAlbumId"
)

// TrackClient is the client API for Track service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type TrackClient interface {
	Playback(ctx context.Context, in *PlaybackRequest, opts ...grpc.CallOption) (*PlaybackResponse, error)
	GetPopularTracks(ctx context.Context, in *GetPopularTracksRequest, opts ...grpc.CallOption) (*MultipleTracks, error)
	GetTrack(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*TrackMessage, error)
	GetSeveralTracks(ctx context.Context, in *RequestByIds, opts ...grpc.CallOption) (*MultipleTracks, error)
	GetTracksByArtistId(ctx context.Context, in *GetTracksByArtistIdRequest, opts ...grpc.CallOption) (*MultipleTracks, error)
	GetTracksByAlbumId(ctx context.Context, in *GetTracksByAlbumIdRequest, opts ...grpc.CallOption) (*MultipleTracks, error)
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

func (c *trackClient) GetPopularTracks(ctx context.Context, in *GetPopularTracksRequest, opts ...grpc.CallOption) (*MultipleTracks, error) {
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

func (c *trackClient) GetSeveralTracks(ctx context.Context, in *RequestByIds, opts ...grpc.CallOption) (*MultipleTracks, error) {
	out := new(MultipleTracks)
	err := c.cc.Invoke(ctx, Track_GetSeveralTracks_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *trackClient) GetTracksByArtistId(ctx context.Context, in *GetTracksByArtistIdRequest, opts ...grpc.CallOption) (*MultipleTracks, error) {
	out := new(MultipleTracks)
	err := c.cc.Invoke(ctx, Track_GetTracksByArtistId_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *trackClient) GetTracksByAlbumId(ctx context.Context, in *GetTracksByAlbumIdRequest, opts ...grpc.CallOption) (*MultipleTracks, error) {
	out := new(MultipleTracks)
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
	Playback(context.Context, *PlaybackRequest) (*PlaybackResponse, error)
	GetPopularTracks(context.Context, *GetPopularTracksRequest) (*MultipleTracks, error)
	GetTrack(context.Context, *RequestById) (*TrackMessage, error)
	GetSeveralTracks(context.Context, *RequestByIds) (*MultipleTracks, error)
	GetTracksByArtistId(context.Context, *GetTracksByArtistIdRequest) (*MultipleTracks, error)
	GetTracksByAlbumId(context.Context, *GetTracksByAlbumIdRequest) (*MultipleTracks, error)
	mustEmbedUnimplementedTrackServer()
}

// UnimplementedTrackServer must be embedded to have forward compatible implementations.
type UnimplementedTrackServer struct {
}

func (UnimplementedTrackServer) Playback(context.Context, *PlaybackRequest) (*PlaybackResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Playback not implemented")
}
func (UnimplementedTrackServer) GetPopularTracks(context.Context, *GetPopularTracksRequest) (*MultipleTracks, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetPopularTracks not implemented")
}
func (UnimplementedTrackServer) GetTrack(context.Context, *RequestById) (*TrackMessage, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTrack not implemented")
}
func (UnimplementedTrackServer) GetSeveralTracks(context.Context, *RequestByIds) (*MultipleTracks, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetSeveralTracks not implemented")
}
func (UnimplementedTrackServer) GetTracksByArtistId(context.Context, *GetTracksByArtistIdRequest) (*MultipleTracks, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTracksByArtistId not implemented")
}
func (UnimplementedTrackServer) GetTracksByAlbumId(context.Context, *GetTracksByAlbumIdRequest) (*MultipleTracks, error) {
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

func _Track_GetPopularTracks_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetPopularTracksRequest)
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
		return srv.(TrackServer).GetPopularTracks(ctx, req.(*GetPopularTracksRequest))
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

func _Track_GetSeveralTracks_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RequestByIds)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TrackServer).GetSeveralTracks(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Track_GetSeveralTracks_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TrackServer).GetSeveralTracks(ctx, req.(*RequestByIds))
	}
	return interceptor(ctx, in, info, handler)
}

func _Track_GetTracksByArtistId_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetTracksByArtistIdRequest)
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
		return srv.(TrackServer).GetTracksByArtistId(ctx, req.(*GetTracksByArtistIdRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Track_GetTracksByAlbumId_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetTracksByAlbumIdRequest)
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
		return srv.(TrackServer).GetTracksByAlbumId(ctx, req.(*GetTracksByAlbumIdRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Track_ServiceDesc is the grpc.ServiceDesc for Track service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Track_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "rhythmicity.main_api.Track",
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
			MethodName: "GetSeveralTracks",
			Handler:    _Track_GetSeveralTracks_Handler,
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
