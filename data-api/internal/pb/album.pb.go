// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.31.0
// 	protoc        v3.12.4
// source: album.proto

package pb

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type AlbumSpotify struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id          string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Popularity  int32    `protobuf:"varint,2,opt,name=popularity,proto3" json:"popularity,omitempty"`
	Images      []*Image `protobuf:"bytes,3,rep,name=images,proto3" json:"images,omitempty"`
	ReleaseData string   `protobuf:"bytes,4,opt,name=releaseData,proto3" json:"releaseData,omitempty"`
}

func (x *AlbumSpotify) Reset() {
	*x = AlbumSpotify{}
	if protoimpl.UnsafeEnabled {
		mi := &file_album_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AlbumSpotify) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AlbumSpotify) ProtoMessage() {}

func (x *AlbumSpotify) ProtoReflect() protoreflect.Message {
	mi := &file_album_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AlbumSpotify.ProtoReflect.Descriptor instead.
func (*AlbumSpotify) Descriptor() ([]byte, []int) {
	return file_album_proto_rawDescGZIP(), []int{0}
}

func (x *AlbumSpotify) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *AlbumSpotify) GetPopularity() int32 {
	if x != nil {
		return x.Popularity
	}
	return 0
}

func (x *AlbumSpotify) GetImages() []*Image {
	if x != nil {
		return x.Images
	}
	return nil
}

func (x *AlbumSpotify) GetReleaseData() string {
	if x != nil {
		return x.ReleaseData
	}
	return ""
}

type AlbumMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id          string        `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name        string        `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	Genres      []string      `protobuf:"bytes,3,rep,name=genres,proto3" json:"genres,omitempty"`
	Styles      []string      `protobuf:"bytes,4,rep,name=styles,proto3" json:"styles,omitempty"`
	TotalTracks int32         `protobuf:"varint,5,opt,name=totalTracks,proto3" json:"totalTracks,omitempty"`
	Spotify     *AlbumSpotify `protobuf:"bytes,6,opt,name=spotify,proto3" json:"spotify,omitempty"`
}

func (x *AlbumMessage) Reset() {
	*x = AlbumMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_album_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *AlbumMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*AlbumMessage) ProtoMessage() {}

func (x *AlbumMessage) ProtoReflect() protoreflect.Message {
	mi := &file_album_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use AlbumMessage.ProtoReflect.Descriptor instead.
func (*AlbumMessage) Descriptor() ([]byte, []int) {
	return file_album_proto_rawDescGZIP(), []int{1}
}

func (x *AlbumMessage) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *AlbumMessage) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *AlbumMessage) GetGenres() []string {
	if x != nil {
		return x.Genres
	}
	return nil
}

func (x *AlbumMessage) GetStyles() []string {
	if x != nil {
		return x.Styles
	}
	return nil
}

func (x *AlbumMessage) GetTotalTracks() int32 {
	if x != nil {
		return x.TotalTracks
	}
	return 0
}

func (x *AlbumMessage) GetSpotify() *AlbumSpotify {
	if x != nil {
		return x.Spotify
	}
	return nil
}

type MultipleAlbums struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Albums []*AlbumMessage `protobuf:"bytes,1,rep,name=albums,proto3" json:"albums,omitempty"`
}

func (x *MultipleAlbums) Reset() {
	*x = MultipleAlbums{}
	if protoimpl.UnsafeEnabled {
		mi := &file_album_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MultipleAlbums) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MultipleAlbums) ProtoMessage() {}

func (x *MultipleAlbums) ProtoReflect() protoreflect.Message {
	mi := &file_album_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MultipleAlbums.ProtoReflect.Descriptor instead.
func (*MultipleAlbums) Descriptor() ([]byte, []int) {
	return file_album_proto_rawDescGZIP(), []int{2}
}

func (x *MultipleAlbums) GetAlbums() []*AlbumMessage {
	if x != nil {
		return x.Albums
	}
	return nil
}

var File_album_proto protoreflect.FileDescriptor

var file_album_proto_rawDesc = []byte{
	0x0a, 0x0b, 0x61, 0x6c, 0x62, 0x75, 0x6d, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x0c, 0x63,
	0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x80, 0x01, 0x0a, 0x0c,
	0x41, 0x6c, 0x62, 0x75, 0x6d, 0x53, 0x70, 0x6f, 0x74, 0x69, 0x66, 0x79, 0x12, 0x0e, 0x0a, 0x02,
	0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x1e, 0x0a, 0x0a,
	0x70, 0x6f, 0x70, 0x75, 0x6c, 0x61, 0x72, 0x69, 0x74, 0x79, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05,
	0x52, 0x0a, 0x70, 0x6f, 0x70, 0x75, 0x6c, 0x61, 0x72, 0x69, 0x74, 0x79, 0x12, 0x1e, 0x0a, 0x06,
	0x69, 0x6d, 0x61, 0x67, 0x65, 0x73, 0x18, 0x03, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x06, 0x2e, 0x49,
	0x6d, 0x61, 0x67, 0x65, 0x52, 0x06, 0x69, 0x6d, 0x61, 0x67, 0x65, 0x73, 0x12, 0x20, 0x0a, 0x0b,
	0x72, 0x65, 0x6c, 0x65, 0x61, 0x73, 0x65, 0x44, 0x61, 0x74, 0x61, 0x18, 0x04, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x0b, 0x72, 0x65, 0x6c, 0x65, 0x61, 0x73, 0x65, 0x44, 0x61, 0x74, 0x61, 0x22, 0xad,
	0x01, 0x0a, 0x0c, 0x41, 0x6c, 0x62, 0x75, 0x6d, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x12,
	0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12,
	0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e,
	0x61, 0x6d, 0x65, 0x12, 0x16, 0x0a, 0x06, 0x67, 0x65, 0x6e, 0x72, 0x65, 0x73, 0x18, 0x03, 0x20,
	0x03, 0x28, 0x09, 0x52, 0x06, 0x67, 0x65, 0x6e, 0x72, 0x65, 0x73, 0x12, 0x16, 0x0a, 0x06, 0x73,
	0x74, 0x79, 0x6c, 0x65, 0x73, 0x18, 0x04, 0x20, 0x03, 0x28, 0x09, 0x52, 0x06, 0x73, 0x74, 0x79,
	0x6c, 0x65, 0x73, 0x12, 0x20, 0x0a, 0x0b, 0x74, 0x6f, 0x74, 0x61, 0x6c, 0x54, 0x72, 0x61, 0x63,
	0x6b, 0x73, 0x18, 0x05, 0x20, 0x01, 0x28, 0x05, 0x52, 0x0b, 0x74, 0x6f, 0x74, 0x61, 0x6c, 0x54,
	0x72, 0x61, 0x63, 0x6b, 0x73, 0x12, 0x27, 0x0a, 0x07, 0x73, 0x70, 0x6f, 0x74, 0x69, 0x66, 0x79,
	0x18, 0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x41, 0x6c, 0x62, 0x75, 0x6d, 0x53, 0x70,
	0x6f, 0x74, 0x69, 0x66, 0x79, 0x52, 0x07, 0x73, 0x70, 0x6f, 0x74, 0x69, 0x66, 0x79, 0x22, 0x37,
	0x0a, 0x0e, 0x4d, 0x75, 0x6c, 0x74, 0x69, 0x70, 0x6c, 0x65, 0x41, 0x6c, 0x62, 0x75, 0x6d, 0x73,
	0x12, 0x25, 0x0a, 0x06, 0x61, 0x6c, 0x62, 0x75, 0x6d, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b,
	0x32, 0x0d, 0x2e, 0x41, 0x6c, 0x62, 0x75, 0x6d, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x52,
	0x06, 0x61, 0x6c, 0x62, 0x75, 0x6d, 0x73, 0x32, 0xcd, 0x01, 0x0a, 0x05, 0x41, 0x6c, 0x62, 0x75,
	0x6d, 0x12, 0x2d, 0x0a, 0x10, 0x47, 0x65, 0x74, 0x50, 0x6f, 0x70, 0x75, 0x6c, 0x61, 0x72, 0x41,
	0x6c, 0x62, 0x75, 0x6d, 0x73, 0x12, 0x06, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x1a, 0x0f, 0x2e,
	0x4d, 0x75, 0x6c, 0x74, 0x69, 0x70, 0x6c, 0x65, 0x41, 0x6c, 0x62, 0x75, 0x6d, 0x73, 0x22, 0x00,
	0x12, 0x29, 0x0a, 0x08, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x62, 0x75, 0x6d, 0x12, 0x0c, 0x2e, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x42, 0x79, 0x49, 0x64, 0x1a, 0x0d, 0x2e, 0x41, 0x6c, 0x62,
	0x75, 0x6d, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x22, 0x00, 0x12, 0x32, 0x0a, 0x11, 0x47,
	0x65, 0x74, 0x41, 0x6c, 0x62, 0x75, 0x6d, 0x42, 0x79, 0x54, 0x72, 0x61, 0x63, 0x6b, 0x49, 0x64,
	0x12, 0x0c, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x42, 0x79, 0x49, 0x64, 0x1a, 0x0d,
	0x2e, 0x41, 0x6c, 0x62, 0x75, 0x6d, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x22, 0x00, 0x12,
	0x36, 0x0a, 0x13, 0x47, 0x65, 0x74, 0x41, 0x6c, 0x62, 0x75, 0x6d, 0x73, 0x42, 0x79, 0x41, 0x72,
	0x74, 0x69, 0x73, 0x74, 0x49, 0x64, 0x12, 0x0c, 0x2e, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x42, 0x79, 0x49, 0x64, 0x1a, 0x0f, 0x2e, 0x4d, 0x75, 0x6c, 0x74, 0x69, 0x70, 0x6c, 0x65, 0x41,
	0x6c, 0x62, 0x75, 0x6d, 0x73, 0x22, 0x00, 0x42, 0x36, 0x5a, 0x34, 0x67, 0x69, 0x74, 0x68, 0x75,
	0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6e, 0x69, 0x63, 0x68, 0x6f, 0x6c, 0x32, 0x30, 0x2f, 0x72,
	0x68, 0x79, 0x74, 0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2f, 0x64, 0x61, 0x74, 0x61, 0x2d,
	0x61, 0x70, 0x69, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x6e, 0x61, 0x6c, 0x2f, 0x70, 0x62, 0x62,
	0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_album_proto_rawDescOnce sync.Once
	file_album_proto_rawDescData = file_album_proto_rawDesc
)

func file_album_proto_rawDescGZIP() []byte {
	file_album_proto_rawDescOnce.Do(func() {
		file_album_proto_rawDescData = protoimpl.X.CompressGZIP(file_album_proto_rawDescData)
	})
	return file_album_proto_rawDescData
}

var file_album_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_album_proto_goTypes = []interface{}{
	(*AlbumSpotify)(nil),   // 0: AlbumSpotify
	(*AlbumMessage)(nil),   // 1: AlbumMessage
	(*MultipleAlbums)(nil), // 2: MultipleAlbums
	(*Image)(nil),          // 3: Image
	(*Empty)(nil),          // 4: Empty
	(*RequestById)(nil),    // 5: RequestById
}
var file_album_proto_depIdxs = []int32{
	3, // 0: AlbumSpotify.images:type_name -> Image
	0, // 1: AlbumMessage.spotify:type_name -> AlbumSpotify
	1, // 2: MultipleAlbums.albums:type_name -> AlbumMessage
	4, // 3: Album.GetPopularAlbums:input_type -> Empty
	5, // 4: Album.GetAlbum:input_type -> RequestById
	5, // 5: Album.GetAlbumByTrackId:input_type -> RequestById
	5, // 6: Album.GetAlbumsByArtistId:input_type -> RequestById
	2, // 7: Album.GetPopularAlbums:output_type -> MultipleAlbums
	1, // 8: Album.GetAlbum:output_type -> AlbumMessage
	1, // 9: Album.GetAlbumByTrackId:output_type -> AlbumMessage
	2, // 10: Album.GetAlbumsByArtistId:output_type -> MultipleAlbums
	7, // [7:11] is the sub-list for method output_type
	3, // [3:7] is the sub-list for method input_type
	3, // [3:3] is the sub-list for extension type_name
	3, // [3:3] is the sub-list for extension extendee
	0, // [0:3] is the sub-list for field type_name
}

func init() { file_album_proto_init() }
func file_album_proto_init() {
	if File_album_proto != nil {
		return
	}
	file_common_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_album_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AlbumSpotify); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_album_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*AlbumMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_album_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MultipleAlbums); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_album_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_album_proto_goTypes,
		DependencyIndexes: file_album_proto_depIdxs,
		MessageInfos:      file_album_proto_msgTypes,
	}.Build()
	File_album_proto = out.File
	file_album_proto_rawDesc = nil
	file_album_proto_goTypes = nil
	file_album_proto_depIdxs = nil
}
