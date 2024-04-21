// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.31.0
// 	protoc        v3.12.4
// source: search.proto

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

type SearchRequest_Kind int32

const (
	SearchRequest_ALL     SearchRequest_Kind = 0
	SearchRequest_ARTISTS SearchRequest_Kind = 1
	SearchRequest_ALBUMS  SearchRequest_Kind = 2
	SearchRequest_TRACKS  SearchRequest_Kind = 3
)

// Enum value maps for SearchRequest_Kind.
var (
	SearchRequest_Kind_name = map[int32]string{
		0: "ALL",
		1: "ARTISTS",
		2: "ALBUMS",
		3: "TRACKS",
	}
	SearchRequest_Kind_value = map[string]int32{
		"ALL":     0,
		"ARTISTS": 1,
		"ALBUMS":  2,
		"TRACKS":  3,
	}
)

func (x SearchRequest_Kind) Enum() *SearchRequest_Kind {
	p := new(SearchRequest_Kind)
	*p = x
	return p
}

func (x SearchRequest_Kind) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (SearchRequest_Kind) Descriptor() protoreflect.EnumDescriptor {
	return file_search_proto_enumTypes[0].Descriptor()
}

func (SearchRequest_Kind) Type() protoreflect.EnumType {
	return &file_search_proto_enumTypes[0]
}

func (x SearchRequest_Kind) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use SearchRequest_Kind.Descriptor instead.
func (SearchRequest_Kind) EnumDescriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{6, 0}
}

type Image struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Width  uint32 `protobuf:"varint,1,opt,name=width,proto3" json:"width,omitempty"`
	Height uint32 `protobuf:"varint,2,opt,name=height,proto3" json:"height,omitempty"`
	Url    string `protobuf:"bytes,3,opt,name=url,proto3" json:"url,omitempty"`
}

func (x *Image) Reset() {
	*x = Image{}
	if protoimpl.UnsafeEnabled {
		mi := &file_search_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Image) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Image) ProtoMessage() {}

func (x *Image) ProtoReflect() protoreflect.Message {
	mi := &file_search_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Image.ProtoReflect.Descriptor instead.
func (*Image) Descriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{0}
}

func (x *Image) GetWidth() uint32 {
	if x != nil {
		return x.Width
	}
	return 0
}

func (x *Image) GetHeight() uint32 {
	if x != nil {
		return x.Height
	}
	return 0
}

func (x *Image) GetUrl() string {
	if x != nil {
		return x.Url
	}
	return ""
}

type Track struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id          string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name        string   `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	ArtistNames []string `protobuf:"bytes,3,rep,name=artistNames,proto3" json:"artistNames,omitempty"`
	AlbumName   string   `protobuf:"bytes,4,opt,name=albumName,proto3" json:"albumName,omitempty"`
	Lyrics      string   `protobuf:"bytes,5,opt,name=lyrics,proto3" json:"lyrics,omitempty"`
	Explicit    bool     `protobuf:"varint,6,opt,name=explicit,proto3" json:"explicit,omitempty"`
	PlayCount   uint64   `protobuf:"varint,7,opt,name=playCount,proto3" json:"playCount,omitempty"`
	DurationMs  uint32   `protobuf:"varint,8,opt,name=durationMs,proto3" json:"durationMs,omitempty"`
	Genres      []string `protobuf:"bytes,9,rep,name=genres,proto3" json:"genres,omitempty"`
	Styles      []string `protobuf:"bytes,10,rep,name=styles,proto3" json:"styles,omitempty"`
	Images      []*Image `protobuf:"bytes,11,rep,name=images,proto3" json:"images,omitempty"`
	Type        string   `protobuf:"bytes,12,opt,name=type,proto3" json:"type,omitempty"`
}

func (x *Track) Reset() {
	*x = Track{}
	if protoimpl.UnsafeEnabled {
		mi := &file_search_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Track) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Track) ProtoMessage() {}

func (x *Track) ProtoReflect() protoreflect.Message {
	mi := &file_search_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Track.ProtoReflect.Descriptor instead.
func (*Track) Descriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{1}
}

func (x *Track) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *Track) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *Track) GetArtistNames() []string {
	if x != nil {
		return x.ArtistNames
	}
	return nil
}

func (x *Track) GetAlbumName() string {
	if x != nil {
		return x.AlbumName
	}
	return ""
}

func (x *Track) GetLyrics() string {
	if x != nil {
		return x.Lyrics
	}
	return ""
}

func (x *Track) GetExplicit() bool {
	if x != nil {
		return x.Explicit
	}
	return false
}

func (x *Track) GetPlayCount() uint64 {
	if x != nil {
		return x.PlayCount
	}
	return 0
}

func (x *Track) GetDurationMs() uint32 {
	if x != nil {
		return x.DurationMs
	}
	return 0
}

func (x *Track) GetGenres() []string {
	if x != nil {
		return x.Genres
	}
	return nil
}

func (x *Track) GetStyles() []string {
	if x != nil {
		return x.Styles
	}
	return nil
}

func (x *Track) GetImages() []*Image {
	if x != nil {
		return x.Images
	}
	return nil
}

func (x *Track) GetType() string {
	if x != nil {
		return x.Type
	}
	return ""
}

type Artist struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id         string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name       string   `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	Genres     []string `protobuf:"bytes,3,rep,name=genres,proto3" json:"genres,omitempty"`
	Styles     []string `protobuf:"bytes,4,rep,name=styles,proto3" json:"styles,omitempty"`
	Images     []*Image `protobuf:"bytes,5,rep,name=images,proto3" json:"images,omitempty"`
	Popularity uint32   `protobuf:"varint,6,opt,name=popularity,proto3" json:"popularity,omitempty"`
	Type       string   `protobuf:"bytes,7,opt,name=type,proto3" json:"type,omitempty"`
}

func (x *Artist) Reset() {
	*x = Artist{}
	if protoimpl.UnsafeEnabled {
		mi := &file_search_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Artist) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Artist) ProtoMessage() {}

func (x *Artist) ProtoReflect() protoreflect.Message {
	mi := &file_search_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Artist.ProtoReflect.Descriptor instead.
func (*Artist) Descriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{2}
}

func (x *Artist) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *Artist) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *Artist) GetGenres() []string {
	if x != nil {
		return x.Genres
	}
	return nil
}

func (x *Artist) GetStyles() []string {
	if x != nil {
		return x.Styles
	}
	return nil
}

func (x *Artist) GetImages() []*Image {
	if x != nil {
		return x.Images
	}
	return nil
}

func (x *Artist) GetPopularity() uint32 {
	if x != nil {
		return x.Popularity
	}
	return 0
}

func (x *Artist) GetType() string {
	if x != nil {
		return x.Type
	}
	return ""
}

type Album struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id          string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name        string   `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	ArtistNames []string `protobuf:"bytes,3,rep,name=artistNames,proto3" json:"artistNames,omitempty"`
	Genres      []string `protobuf:"bytes,4,rep,name=genres,proto3" json:"genres,omitempty"`
	Styles      []string `protobuf:"bytes,5,rep,name=styles,proto3" json:"styles,omitempty"`
	ReleaseDate string   `protobuf:"bytes,6,opt,name=releaseDate,proto3" json:"releaseDate,omitempty"`
	TotalTracks uint32   `protobuf:"varint,7,opt,name=totalTracks,proto3" json:"totalTracks,omitempty"`
	Images      []*Image `protobuf:"bytes,8,rep,name=images,proto3" json:"images,omitempty"`
	Popularity  uint32   `protobuf:"varint,9,opt,name=popularity,proto3" json:"popularity,omitempty"`
	Type        string   `protobuf:"bytes,10,opt,name=type,proto3" json:"type,omitempty"`
}

func (x *Album) Reset() {
	*x = Album{}
	if protoimpl.UnsafeEnabled {
		mi := &file_search_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Album) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Album) ProtoMessage() {}

func (x *Album) ProtoReflect() protoreflect.Message {
	mi := &file_search_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Album.ProtoReflect.Descriptor instead.
func (*Album) Descriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{3}
}

func (x *Album) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *Album) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *Album) GetArtistNames() []string {
	if x != nil {
		return x.ArtistNames
	}
	return nil
}

func (x *Album) GetGenres() []string {
	if x != nil {
		return x.Genres
	}
	return nil
}

func (x *Album) GetStyles() []string {
	if x != nil {
		return x.Styles
	}
	return nil
}

func (x *Album) GetReleaseDate() string {
	if x != nil {
		return x.ReleaseDate
	}
	return ""
}

func (x *Album) GetTotalTracks() uint32 {
	if x != nil {
		return x.TotalTracks
	}
	return 0
}

func (x *Album) GetImages() []*Image {
	if x != nil {
		return x.Images
	}
	return nil
}

func (x *Album) GetPopularity() uint32 {
	if x != nil {
		return x.Popularity
	}
	return 0
}

func (x *Album) GetType() string {
	if x != nil {
		return x.Type
	}
	return ""
}

type BestResult struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Type:
	//
	//	*BestResult_Track
	//	*BestResult_Artist
	//	*BestResult_Album
	Type isBestResult_Type `protobuf_oneof:"type"`
}

func (x *BestResult) Reset() {
	*x = BestResult{}
	if protoimpl.UnsafeEnabled {
		mi := &file_search_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *BestResult) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*BestResult) ProtoMessage() {}

func (x *BestResult) ProtoReflect() protoreflect.Message {
	mi := &file_search_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use BestResult.ProtoReflect.Descriptor instead.
func (*BestResult) Descriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{4}
}

func (m *BestResult) GetType() isBestResult_Type {
	if m != nil {
		return m.Type
	}
	return nil
}

func (x *BestResult) GetTrack() *Track {
	if x, ok := x.GetType().(*BestResult_Track); ok {
		return x.Track
	}
	return nil
}

func (x *BestResult) GetArtist() *Artist {
	if x, ok := x.GetType().(*BestResult_Artist); ok {
		return x.Artist
	}
	return nil
}

func (x *BestResult) GetAlbum() *Album {
	if x, ok := x.GetType().(*BestResult_Album); ok {
		return x.Album
	}
	return nil
}

type isBestResult_Type interface {
	isBestResult_Type()
}

type BestResult_Track struct {
	Track *Track `protobuf:"bytes,1,opt,name=track,proto3,oneof"`
}

type BestResult_Artist struct {
	Artist *Artist `protobuf:"bytes,2,opt,name=artist,proto3,oneof"`
}

type BestResult_Album struct {
	Album *Album `protobuf:"bytes,3,opt,name=album,proto3,oneof"`
}

func (*BestResult_Track) isBestResult_Type() {}

func (*BestResult_Artist) isBestResult_Type() {}

func (*BestResult_Album) isBestResult_Type() {}

type Filters struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Genres []string `protobuf:"bytes,1,rep,name=genres,proto3" json:"genres,omitempty"`
	Styles []string `protobuf:"bytes,2,rep,name=styles,proto3" json:"styles,omitempty"`
}

func (x *Filters) Reset() {
	*x = Filters{}
	if protoimpl.UnsafeEnabled {
		mi := &file_search_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Filters) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Filters) ProtoMessage() {}

func (x *Filters) ProtoReflect() protoreflect.Message {
	mi := &file_search_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Filters.ProtoReflect.Descriptor instead.
func (*Filters) Descriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{5}
}

func (x *Filters) GetGenres() []string {
	if x != nil {
		return x.Genres
	}
	return nil
}

func (x *Filters) GetStyles() []string {
	if x != nil {
		return x.Styles
	}
	return nil
}

type SearchRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Query   string              `protobuf:"bytes,1,opt,name=query,proto3" json:"query,omitempty"`
	Offset  *uint32             `protobuf:"varint,2,opt,name=offset,proto3,oneof" json:"offset,omitempty"`
	Limit   *uint32             `protobuf:"varint,3,opt,name=limit,proto3,oneof" json:"limit,omitempty"`
	Kind    *SearchRequest_Kind `protobuf:"varint,4,opt,name=kind,proto3,enum=rhythmicity.search_api.SearchRequest_Kind,oneof" json:"kind,omitempty"`
	Filters *Filters            `protobuf:"bytes,5,opt,name=filters,proto3,oneof" json:"filters,omitempty"`
}

func (x *SearchRequest) Reset() {
	*x = SearchRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_search_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SearchRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SearchRequest) ProtoMessage() {}

func (x *SearchRequest) ProtoReflect() protoreflect.Message {
	mi := &file_search_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SearchRequest.ProtoReflect.Descriptor instead.
func (*SearchRequest) Descriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{6}
}

func (x *SearchRequest) GetQuery() string {
	if x != nil {
		return x.Query
	}
	return ""
}

func (x *SearchRequest) GetOffset() uint32 {
	if x != nil && x.Offset != nil {
		return *x.Offset
	}
	return 0
}

func (x *SearchRequest) GetLimit() uint32 {
	if x != nil && x.Limit != nil {
		return *x.Limit
	}
	return 0
}

func (x *SearchRequest) GetKind() SearchRequest_Kind {
	if x != nil && x.Kind != nil {
		return *x.Kind
	}
	return SearchRequest_ALL
}

func (x *SearchRequest) GetFilters() *Filters {
	if x != nil {
		return x.Filters
	}
	return nil
}

type SearchResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	BestResult *BestResult `protobuf:"bytes,1,opt,name=bestResult,proto3" json:"bestResult,omitempty"`
	Tracks     []*Track    `protobuf:"bytes,2,rep,name=tracks,proto3" json:"tracks,omitempty"`
	Artists    []*Artist   `protobuf:"bytes,3,rep,name=artists,proto3" json:"artists,omitempty"`
	Albums     []*Album    `protobuf:"bytes,4,rep,name=albums,proto3" json:"albums,omitempty"`
}

func (x *SearchResponse) Reset() {
	*x = SearchResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_search_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SearchResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SearchResponse) ProtoMessage() {}

func (x *SearchResponse) ProtoReflect() protoreflect.Message {
	mi := &file_search_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SearchResponse.ProtoReflect.Descriptor instead.
func (*SearchResponse) Descriptor() ([]byte, []int) {
	return file_search_proto_rawDescGZIP(), []int{7}
}

func (x *SearchResponse) GetBestResult() *BestResult {
	if x != nil {
		return x.BestResult
	}
	return nil
}

func (x *SearchResponse) GetTracks() []*Track {
	if x != nil {
		return x.Tracks
	}
	return nil
}

func (x *SearchResponse) GetArtists() []*Artist {
	if x != nil {
		return x.Artists
	}
	return nil
}

func (x *SearchResponse) GetAlbums() []*Album {
	if x != nil {
		return x.Albums
	}
	return nil
}

var File_search_proto protoreflect.FileDescriptor

var file_search_proto_rawDesc = []byte{
	0x0a, 0x0c, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x16,
	0x72, 0x68, 0x79, 0x74, 0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2e, 0x73, 0x65, 0x61, 0x72,
	0x63, 0x68, 0x5f, 0x61, 0x70, 0x69, 0x22, 0x47, 0x0a, 0x05, 0x49, 0x6d, 0x61, 0x67, 0x65, 0x12,
	0x14, 0x0a, 0x05, 0x77, 0x69, 0x64, 0x74, 0x68, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0d, 0x52, 0x05,
	0x77, 0x69, 0x64, 0x74, 0x68, 0x12, 0x16, 0x0a, 0x06, 0x68, 0x65, 0x69, 0x67, 0x68, 0x74, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x0d, 0x52, 0x06, 0x68, 0x65, 0x69, 0x67, 0x68, 0x74, 0x12, 0x10, 0x0a,
	0x03, 0x75, 0x72, 0x6c, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x75, 0x72, 0x6c, 0x22,
	0xd8, 0x02, 0x0a, 0x05, 0x54, 0x72, 0x61, 0x63, 0x6b, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d,
	0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x20, 0x0a,
	0x0b, 0x61, 0x72, 0x74, 0x69, 0x73, 0x74, 0x4e, 0x61, 0x6d, 0x65, 0x73, 0x18, 0x03, 0x20, 0x03,
	0x28, 0x09, 0x52, 0x0b, 0x61, 0x72, 0x74, 0x69, 0x73, 0x74, 0x4e, 0x61, 0x6d, 0x65, 0x73, 0x12,
	0x1c, 0x0a, 0x09, 0x61, 0x6c, 0x62, 0x75, 0x6d, 0x4e, 0x61, 0x6d, 0x65, 0x18, 0x04, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x09, 0x61, 0x6c, 0x62, 0x75, 0x6d, 0x4e, 0x61, 0x6d, 0x65, 0x12, 0x16, 0x0a,
	0x06, 0x6c, 0x79, 0x72, 0x69, 0x63, 0x73, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x6c,
	0x79, 0x72, 0x69, 0x63, 0x73, 0x12, 0x1a, 0x0a, 0x08, 0x65, 0x78, 0x70, 0x6c, 0x69, 0x63, 0x69,
	0x74, 0x18, 0x06, 0x20, 0x01, 0x28, 0x08, 0x52, 0x08, 0x65, 0x78, 0x70, 0x6c, 0x69, 0x63, 0x69,
	0x74, 0x12, 0x1c, 0x0a, 0x09, 0x70, 0x6c, 0x61, 0x79, 0x43, 0x6f, 0x75, 0x6e, 0x74, 0x18, 0x07,
	0x20, 0x01, 0x28, 0x04, 0x52, 0x09, 0x70, 0x6c, 0x61, 0x79, 0x43, 0x6f, 0x75, 0x6e, 0x74, 0x12,
	0x1e, 0x0a, 0x0a, 0x64, 0x75, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x4d, 0x73, 0x18, 0x08, 0x20,
	0x01, 0x28, 0x0d, 0x52, 0x0a, 0x64, 0x75, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x4d, 0x73, 0x12,
	0x16, 0x0a, 0x06, 0x67, 0x65, 0x6e, 0x72, 0x65, 0x73, 0x18, 0x09, 0x20, 0x03, 0x28, 0x09, 0x52,
	0x06, 0x67, 0x65, 0x6e, 0x72, 0x65, 0x73, 0x12, 0x16, 0x0a, 0x06, 0x73, 0x74, 0x79, 0x6c, 0x65,
	0x73, 0x18, 0x0a, 0x20, 0x03, 0x28, 0x09, 0x52, 0x06, 0x73, 0x74, 0x79, 0x6c, 0x65, 0x73, 0x12,
	0x35, 0x0a, 0x06, 0x69, 0x6d, 0x61, 0x67, 0x65, 0x73, 0x18, 0x0b, 0x20, 0x03, 0x28, 0x0b, 0x32,
	0x1d, 0x2e, 0x72, 0x68, 0x79, 0x74, 0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2e, 0x73, 0x65,
	0x61, 0x72, 0x63, 0x68, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x49, 0x6d, 0x61, 0x67, 0x65, 0x52, 0x06,
	0x69, 0x6d, 0x61, 0x67, 0x65, 0x73, 0x12, 0x12, 0x0a, 0x04, 0x74, 0x79, 0x70, 0x65, 0x18, 0x0c,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x74, 0x79, 0x70, 0x65, 0x22, 0xc7, 0x01, 0x0a, 0x06, 0x41,
	0x72, 0x74, 0x69, 0x73, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x16, 0x0a, 0x06, 0x67, 0x65, 0x6e,
	0x72, 0x65, 0x73, 0x18, 0x03, 0x20, 0x03, 0x28, 0x09, 0x52, 0x06, 0x67, 0x65, 0x6e, 0x72, 0x65,
	0x73, 0x12, 0x16, 0x0a, 0x06, 0x73, 0x74, 0x79, 0x6c, 0x65, 0x73, 0x18, 0x04, 0x20, 0x03, 0x28,
	0x09, 0x52, 0x06, 0x73, 0x74, 0x79, 0x6c, 0x65, 0x73, 0x12, 0x35, 0x0a, 0x06, 0x69, 0x6d, 0x61,
	0x67, 0x65, 0x73, 0x18, 0x05, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x1d, 0x2e, 0x72, 0x68, 0x79, 0x74,
	0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2e, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x61,
	0x70, 0x69, 0x2e, 0x49, 0x6d, 0x61, 0x67, 0x65, 0x52, 0x06, 0x69, 0x6d, 0x61, 0x67, 0x65, 0x73,
	0x12, 0x1e, 0x0a, 0x0a, 0x70, 0x6f, 0x70, 0x75, 0x6c, 0x61, 0x72, 0x69, 0x74, 0x79, 0x18, 0x06,
	0x20, 0x01, 0x28, 0x0d, 0x52, 0x0a, 0x70, 0x6f, 0x70, 0x75, 0x6c, 0x61, 0x72, 0x69, 0x74, 0x79,
	0x12, 0x12, 0x0a, 0x04, 0x74, 0x79, 0x70, 0x65, 0x18, 0x07, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04,
	0x74, 0x79, 0x70, 0x65, 0x22, 0xac, 0x02, 0x0a, 0x05, 0x41, 0x6c, 0x62, 0x75, 0x6d, 0x12, 0x0e,
	0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x12,
	0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61,
	0x6d, 0x65, 0x12, 0x20, 0x0a, 0x0b, 0x61, 0x72, 0x74, 0x69, 0x73, 0x74, 0x4e, 0x61, 0x6d, 0x65,
	0x73, 0x18, 0x03, 0x20, 0x03, 0x28, 0x09, 0x52, 0x0b, 0x61, 0x72, 0x74, 0x69, 0x73, 0x74, 0x4e,
	0x61, 0x6d, 0x65, 0x73, 0x12, 0x16, 0x0a, 0x06, 0x67, 0x65, 0x6e, 0x72, 0x65, 0x73, 0x18, 0x04,
	0x20, 0x03, 0x28, 0x09, 0x52, 0x06, 0x67, 0x65, 0x6e, 0x72, 0x65, 0x73, 0x12, 0x16, 0x0a, 0x06,
	0x73, 0x74, 0x79, 0x6c, 0x65, 0x73, 0x18, 0x05, 0x20, 0x03, 0x28, 0x09, 0x52, 0x06, 0x73, 0x74,
	0x79, 0x6c, 0x65, 0x73, 0x12, 0x20, 0x0a, 0x0b, 0x72, 0x65, 0x6c, 0x65, 0x61, 0x73, 0x65, 0x44,
	0x61, 0x74, 0x65, 0x18, 0x06, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x72, 0x65, 0x6c, 0x65, 0x61,
	0x73, 0x65, 0x44, 0x61, 0x74, 0x65, 0x12, 0x20, 0x0a, 0x0b, 0x74, 0x6f, 0x74, 0x61, 0x6c, 0x54,
	0x72, 0x61, 0x63, 0x6b, 0x73, 0x18, 0x07, 0x20, 0x01, 0x28, 0x0d, 0x52, 0x0b, 0x74, 0x6f, 0x74,
	0x61, 0x6c, 0x54, 0x72, 0x61, 0x63, 0x6b, 0x73, 0x12, 0x35, 0x0a, 0x06, 0x69, 0x6d, 0x61, 0x67,
	0x65, 0x73, 0x18, 0x08, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x1d, 0x2e, 0x72, 0x68, 0x79, 0x74, 0x68,
	0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2e, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x61, 0x70,
	0x69, 0x2e, 0x49, 0x6d, 0x61, 0x67, 0x65, 0x52, 0x06, 0x69, 0x6d, 0x61, 0x67, 0x65, 0x73, 0x12,
	0x1e, 0x0a, 0x0a, 0x70, 0x6f, 0x70, 0x75, 0x6c, 0x61, 0x72, 0x69, 0x74, 0x79, 0x18, 0x09, 0x20,
	0x01, 0x28, 0x0d, 0x52, 0x0a, 0x70, 0x6f, 0x70, 0x75, 0x6c, 0x61, 0x72, 0x69, 0x74, 0x79, 0x12,
	0x12, 0x0a, 0x04, 0x74, 0x79, 0x70, 0x65, 0x18, 0x0a, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x74,
	0x79, 0x70, 0x65, 0x22, 0xbc, 0x01, 0x0a, 0x0a, 0x42, 0x65, 0x73, 0x74, 0x52, 0x65, 0x73, 0x75,
	0x6c, 0x74, 0x12, 0x35, 0x0a, 0x05, 0x74, 0x72, 0x61, 0x63, 0x6b, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x1d, 0x2e, 0x72, 0x68, 0x79, 0x74, 0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2e,
	0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x54, 0x72, 0x61, 0x63, 0x6b,
	0x48, 0x00, 0x52, 0x05, 0x74, 0x72, 0x61, 0x63, 0x6b, 0x12, 0x38, 0x0a, 0x06, 0x61, 0x72, 0x74,
	0x69, 0x73, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1e, 0x2e, 0x72, 0x68, 0x79, 0x74,
	0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2e, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x61,
	0x70, 0x69, 0x2e, 0x41, 0x72, 0x74, 0x69, 0x73, 0x74, 0x48, 0x00, 0x52, 0x06, 0x61, 0x72, 0x74,
	0x69, 0x73, 0x74, 0x12, 0x35, 0x0a, 0x05, 0x61, 0x6c, 0x62, 0x75, 0x6d, 0x18, 0x03, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x1d, 0x2e, 0x72, 0x68, 0x79, 0x74, 0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79,
	0x2e, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x41, 0x6c, 0x62, 0x75,
	0x6d, 0x48, 0x00, 0x52, 0x05, 0x61, 0x6c, 0x62, 0x75, 0x6d, 0x42, 0x06, 0x0a, 0x04, 0x74, 0x79,
	0x70, 0x65, 0x22, 0x39, 0x0a, 0x07, 0x46, 0x69, 0x6c, 0x74, 0x65, 0x72, 0x73, 0x12, 0x16, 0x0a,
	0x06, 0x67, 0x65, 0x6e, 0x72, 0x65, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x09, 0x52, 0x06, 0x67,
	0x65, 0x6e, 0x72, 0x65, 0x73, 0x12, 0x16, 0x0a, 0x06, 0x73, 0x74, 0x79, 0x6c, 0x65, 0x73, 0x18,
	0x02, 0x20, 0x03, 0x28, 0x09, 0x52, 0x06, 0x73, 0x74, 0x79, 0x6c, 0x65, 0x73, 0x22, 0xc2, 0x02,
	0x0a, 0x0d, 0x53, 0x65, 0x61, 0x72, 0x63, 0x68, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12,
	0x14, 0x0a, 0x05, 0x71, 0x75, 0x65, 0x72, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05,
	0x71, 0x75, 0x65, 0x72, 0x79, 0x12, 0x1b, 0x0a, 0x06, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x0d, 0x48, 0x00, 0x52, 0x06, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x88,
	0x01, 0x01, 0x12, 0x19, 0x0a, 0x05, 0x6c, 0x69, 0x6d, 0x69, 0x74, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x0d, 0x48, 0x01, 0x52, 0x05, 0x6c, 0x69, 0x6d, 0x69, 0x74, 0x88, 0x01, 0x01, 0x12, 0x43, 0x0a,
	0x04, 0x6b, 0x69, 0x6e, 0x64, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x2a, 0x2e, 0x72, 0x68,
	0x79, 0x74, 0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2e, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68,
	0x5f, 0x61, 0x70, 0x69, 0x2e, 0x53, 0x65, 0x61, 0x72, 0x63, 0x68, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x2e, 0x4b, 0x69, 0x6e, 0x64, 0x48, 0x02, 0x52, 0x04, 0x6b, 0x69, 0x6e, 0x64, 0x88,
	0x01, 0x01, 0x12, 0x3e, 0x0a, 0x07, 0x66, 0x69, 0x6c, 0x74, 0x65, 0x72, 0x73, 0x18, 0x05, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x1f, 0x2e, 0x72, 0x68, 0x79, 0x74, 0x68, 0x6d, 0x69, 0x63, 0x69, 0x74,
	0x79, 0x2e, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x46, 0x69, 0x6c,
	0x74, 0x65, 0x72, 0x73, 0x48, 0x03, 0x52, 0x07, 0x66, 0x69, 0x6c, 0x74, 0x65, 0x72, 0x73, 0x88,
	0x01, 0x01, 0x22, 0x34, 0x0a, 0x04, 0x4b, 0x69, 0x6e, 0x64, 0x12, 0x07, 0x0a, 0x03, 0x41, 0x4c,
	0x4c, 0x10, 0x00, 0x12, 0x0b, 0x0a, 0x07, 0x41, 0x52, 0x54, 0x49, 0x53, 0x54, 0x53, 0x10, 0x01,
	0x12, 0x0a, 0x0a, 0x06, 0x41, 0x4c, 0x42, 0x55, 0x4d, 0x53, 0x10, 0x02, 0x12, 0x0a, 0x0a, 0x06,
	0x54, 0x52, 0x41, 0x43, 0x4b, 0x53, 0x10, 0x03, 0x42, 0x09, 0x0a, 0x07, 0x5f, 0x6f, 0x66, 0x66,
	0x73, 0x65, 0x74, 0x42, 0x08, 0x0a, 0x06, 0x5f, 0x6c, 0x69, 0x6d, 0x69, 0x74, 0x42, 0x07, 0x0a,
	0x05, 0x5f, 0x6b, 0x69, 0x6e, 0x64, 0x42, 0x0a, 0x0a, 0x08, 0x5f, 0x66, 0x69, 0x6c, 0x74, 0x65,
	0x72, 0x73, 0x22, 0xfc, 0x01, 0x0a, 0x0e, 0x53, 0x65, 0x61, 0x72, 0x63, 0x68, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x42, 0x0a, 0x0a, 0x62, 0x65, 0x73, 0x74, 0x52, 0x65, 0x73,
	0x75, 0x6c, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x22, 0x2e, 0x72, 0x68, 0x79, 0x74,
	0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2e, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x61,
	0x70, 0x69, 0x2e, 0x42, 0x65, 0x73, 0x74, 0x52, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x52, 0x0a, 0x62,
	0x65, 0x73, 0x74, 0x52, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x12, 0x35, 0x0a, 0x06, 0x74, 0x72, 0x61,
	0x63, 0x6b, 0x73, 0x18, 0x02, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x1d, 0x2e, 0x72, 0x68, 0x79, 0x74,
	0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2e, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x61,
	0x70, 0x69, 0x2e, 0x54, 0x72, 0x61, 0x63, 0x6b, 0x52, 0x06, 0x74, 0x72, 0x61, 0x63, 0x6b, 0x73,
	0x12, 0x38, 0x0a, 0x07, 0x61, 0x72, 0x74, 0x69, 0x73, 0x74, 0x73, 0x18, 0x03, 0x20, 0x03, 0x28,
	0x0b, 0x32, 0x1e, 0x2e, 0x72, 0x68, 0x79, 0x74, 0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2e,
	0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x41, 0x72, 0x74, 0x69, 0x73,
	0x74, 0x52, 0x07, 0x61, 0x72, 0x74, 0x69, 0x73, 0x74, 0x73, 0x12, 0x35, 0x0a, 0x06, 0x61, 0x6c,
	0x62, 0x75, 0x6d, 0x73, 0x18, 0x04, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x1d, 0x2e, 0x72, 0x68, 0x79,
	0x74, 0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2e, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f,
	0x61, 0x70, 0x69, 0x2e, 0x41, 0x6c, 0x62, 0x75, 0x6d, 0x52, 0x06, 0x61, 0x6c, 0x62, 0x75, 0x6d,
	0x73, 0x32, 0x63, 0x0a, 0x06, 0x53, 0x65, 0x61, 0x72, 0x63, 0x68, 0x12, 0x59, 0x0a, 0x06, 0x53,
	0x65, 0x61, 0x72, 0x63, 0x68, 0x12, 0x25, 0x2e, 0x72, 0x68, 0x79, 0x74, 0x68, 0x6d, 0x69, 0x63,
	0x69, 0x74, 0x79, 0x2e, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x53,
	0x65, 0x61, 0x72, 0x63, 0x68, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x26, 0x2e, 0x72,
	0x68, 0x79, 0x74, 0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2e, 0x73, 0x65, 0x61, 0x72, 0x63,
	0x68, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x53, 0x65, 0x61, 0x72, 0x63, 0x68, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x42, 0x40, 0x5a, 0x3e, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62,
	0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6e, 0x69, 0x63, 0x68, 0x6f, 0x6c, 0x32, 0x30, 0x2f, 0x72, 0x68,
	0x79, 0x74, 0x68, 0x6d, 0x69, 0x63, 0x69, 0x74, 0x79, 0x2f, 0x73, 0x65, 0x61, 0x72, 0x63, 0x68,
	0x2d, 0x61, 0x70, 0x69, 0x2f, 0x61, 0x70, 0x70, 0x6c, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e,
	0x2f, 0x67, 0x72, 0x70, 0x63, 0x2f, 0x70, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_search_proto_rawDescOnce sync.Once
	file_search_proto_rawDescData = file_search_proto_rawDesc
)

func file_search_proto_rawDescGZIP() []byte {
	file_search_proto_rawDescOnce.Do(func() {
		file_search_proto_rawDescData = protoimpl.X.CompressGZIP(file_search_proto_rawDescData)
	})
	return file_search_proto_rawDescData
}

var file_search_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_search_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_search_proto_goTypes = []interface{}{
	(SearchRequest_Kind)(0), // 0: rhythmicity.search_api.SearchRequest.Kind
	(*Image)(nil),           // 1: rhythmicity.search_api.Image
	(*Track)(nil),           // 2: rhythmicity.search_api.Track
	(*Artist)(nil),          // 3: rhythmicity.search_api.Artist
	(*Album)(nil),           // 4: rhythmicity.search_api.Album
	(*BestResult)(nil),      // 5: rhythmicity.search_api.BestResult
	(*Filters)(nil),         // 6: rhythmicity.search_api.Filters
	(*SearchRequest)(nil),   // 7: rhythmicity.search_api.SearchRequest
	(*SearchResponse)(nil),  // 8: rhythmicity.search_api.SearchResponse
}
var file_search_proto_depIdxs = []int32{
	1,  // 0: rhythmicity.search_api.Track.images:type_name -> rhythmicity.search_api.Image
	1,  // 1: rhythmicity.search_api.Artist.images:type_name -> rhythmicity.search_api.Image
	1,  // 2: rhythmicity.search_api.Album.images:type_name -> rhythmicity.search_api.Image
	2,  // 3: rhythmicity.search_api.BestResult.track:type_name -> rhythmicity.search_api.Track
	3,  // 4: rhythmicity.search_api.BestResult.artist:type_name -> rhythmicity.search_api.Artist
	4,  // 5: rhythmicity.search_api.BestResult.album:type_name -> rhythmicity.search_api.Album
	0,  // 6: rhythmicity.search_api.SearchRequest.kind:type_name -> rhythmicity.search_api.SearchRequest.Kind
	6,  // 7: rhythmicity.search_api.SearchRequest.filters:type_name -> rhythmicity.search_api.Filters
	5,  // 8: rhythmicity.search_api.SearchResponse.bestResult:type_name -> rhythmicity.search_api.BestResult
	2,  // 9: rhythmicity.search_api.SearchResponse.tracks:type_name -> rhythmicity.search_api.Track
	3,  // 10: rhythmicity.search_api.SearchResponse.artists:type_name -> rhythmicity.search_api.Artist
	4,  // 11: rhythmicity.search_api.SearchResponse.albums:type_name -> rhythmicity.search_api.Album
	7,  // 12: rhythmicity.search_api.Search.Search:input_type -> rhythmicity.search_api.SearchRequest
	8,  // 13: rhythmicity.search_api.Search.Search:output_type -> rhythmicity.search_api.SearchResponse
	13, // [13:14] is the sub-list for method output_type
	12, // [12:13] is the sub-list for method input_type
	12, // [12:12] is the sub-list for extension type_name
	12, // [12:12] is the sub-list for extension extendee
	0,  // [0:12] is the sub-list for field type_name
}

func init() { file_search_proto_init() }
func file_search_proto_init() {
	if File_search_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_search_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Image); i {
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
		file_search_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Track); i {
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
		file_search_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Artist); i {
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
		file_search_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Album); i {
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
		file_search_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*BestResult); i {
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
		file_search_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Filters); i {
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
		file_search_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SearchRequest); i {
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
		file_search_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SearchResponse); i {
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
	file_search_proto_msgTypes[4].OneofWrappers = []interface{}{
		(*BestResult_Track)(nil),
		(*BestResult_Artist)(nil),
		(*BestResult_Album)(nil),
	}
	file_search_proto_msgTypes[6].OneofWrappers = []interface{}{}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_search_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_search_proto_goTypes,
		DependencyIndexes: file_search_proto_depIdxs,
		EnumInfos:         file_search_proto_enumTypes,
		MessageInfos:      file_search_proto_msgTypes,
	}.Build()
	File_search_proto = out.File
	file_search_proto_rawDesc = nil
	file_search_proto_goTypes = nil
	file_search_proto_depIdxs = nil
}
