gen-proto:
	protoc \
	--proto_path=api/proto \
	--go_out=./internal/pb/ \
	--go_opt=paths=source_relative \
	--go-grpc_out=./internal/pb/ \
	--go-grpc_opt=paths=source_relative \
	--experimental_allow_proto3_optional \
	api/proto/*.proto

clean-proto:
	rm ./internal/pb/*.go