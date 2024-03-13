// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v3.12.4
// source: album.proto

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
	Album_GetPopularAlbums_FullMethodName    = "/Album/GetPopularAlbums"
	Album_GetAlbum_FullMethodName            = "/Album/GetAlbum"
	Album_GetAlbumByTrackId_FullMethodName   = "/Album/GetAlbumByTrackId"
	Album_GetAlbumsByArtistId_FullMethodName = "/Album/GetAlbumsByArtistId"
)

// AlbumClient is the client API for Album service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type AlbumClient interface {
	GetPopularAlbums(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*MultipleAlbums, error)
	GetAlbum(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*AlbumMessage, error)
	GetAlbumByTrackId(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*AlbumMessage, error)
	GetAlbumsByArtistId(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*MultipleAlbums, error)
}

type albumClient struct {
	cc grpc.ClientConnInterface
}

func NewAlbumClient(cc grpc.ClientConnInterface) AlbumClient {
	return &albumClient{cc}
}

func (c *albumClient) GetPopularAlbums(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*MultipleAlbums, error) {
	out := new(MultipleAlbums)
	err := c.cc.Invoke(ctx, Album_GetPopularAlbums_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *albumClient) GetAlbum(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*AlbumMessage, error) {
	out := new(AlbumMessage)
	err := c.cc.Invoke(ctx, Album_GetAlbum_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *albumClient) GetAlbumByTrackId(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*AlbumMessage, error) {
	out := new(AlbumMessage)
	err := c.cc.Invoke(ctx, Album_GetAlbumByTrackId_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *albumClient) GetAlbumsByArtistId(ctx context.Context, in *RequestById, opts ...grpc.CallOption) (*MultipleAlbums, error) {
	out := new(MultipleAlbums)
	err := c.cc.Invoke(ctx, Album_GetAlbumsByArtistId_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// AlbumServer is the server API for Album service.
// All implementations must embed UnimplementedAlbumServer
// for forward compatibility
type AlbumServer interface {
	GetPopularAlbums(context.Context, *Empty) (*MultipleAlbums, error)
	GetAlbum(context.Context, *RequestById) (*AlbumMessage, error)
	GetAlbumByTrackId(context.Context, *RequestById) (*AlbumMessage, error)
	GetAlbumsByArtistId(context.Context, *RequestById) (*MultipleAlbums, error)
	mustEmbedUnimplementedAlbumServer()
}

// UnimplementedAlbumServer must be embedded to have forward compatible implementations.
type UnimplementedAlbumServer struct {
}

func (UnimplementedAlbumServer) GetPopularAlbums(context.Context, *Empty) (*MultipleAlbums, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetPopularAlbums not implemented")
}
func (UnimplementedAlbumServer) GetAlbum(context.Context, *RequestById) (*AlbumMessage, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetAlbum not implemented")
}
func (UnimplementedAlbumServer) GetAlbumByTrackId(context.Context, *RequestById) (*AlbumMessage, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetAlbumByTrackId not implemented")
}
func (UnimplementedAlbumServer) GetAlbumsByArtistId(context.Context, *RequestById) (*MultipleAlbums, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetAlbumsByArtistId not implemented")
}
func (UnimplementedAlbumServer) mustEmbedUnimplementedAlbumServer() {}

// UnsafeAlbumServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to AlbumServer will
// result in compilation errors.
type UnsafeAlbumServer interface {
	mustEmbedUnimplementedAlbumServer()
}

func RegisterAlbumServer(s grpc.ServiceRegistrar, srv AlbumServer) {
	s.RegisterService(&Album_ServiceDesc, srv)
}

func _Album_GetPopularAlbums_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AlbumServer).GetPopularAlbums(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Album_GetPopularAlbums_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AlbumServer).GetPopularAlbums(ctx, req.(*Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _Album_GetAlbum_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RequestById)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AlbumServer).GetAlbum(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Album_GetAlbum_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AlbumServer).GetAlbum(ctx, req.(*RequestById))
	}
	return interceptor(ctx, in, info, handler)
}

func _Album_GetAlbumByTrackId_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RequestById)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AlbumServer).GetAlbumByTrackId(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Album_GetAlbumByTrackId_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AlbumServer).GetAlbumByTrackId(ctx, req.(*RequestById))
	}
	return interceptor(ctx, in, info, handler)
}

func _Album_GetAlbumsByArtistId_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RequestById)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AlbumServer).GetAlbumsByArtistId(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Album_GetAlbumsByArtistId_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AlbumServer).GetAlbumsByArtistId(ctx, req.(*RequestById))
	}
	return interceptor(ctx, in, info, handler)
}

// Album_ServiceDesc is the grpc.ServiceDesc for Album service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Album_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "Album",
	HandlerType: (*AlbumServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetPopularAlbums",
			Handler:    _Album_GetPopularAlbums_Handler,
		},
		{
			MethodName: "GetAlbum",
			Handler:    _Album_GetAlbum_Handler,
		},
		{
			MethodName: "GetAlbumByTrackId",
			Handler:    _Album_GetAlbumByTrackId_Handler,
		},
		{
			MethodName: "GetAlbumsByArtistId",
			Handler:    _Album_GetAlbumsByArtistId_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "album.proto",
}
