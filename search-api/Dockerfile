FROM golang:1.21.5

WORKDIR /app
ENV PATH="/go/bin:${PATH}"
ENV GO111MODULE=on
ENV CGO_ENABLED=1

COPY go.mod go.sum ./
RUN go mod download

COPY *.go ./

RUN apt-get update && \
    apt-get install build-essential protobuf-compiler -y && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.3.0 && \
    go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.31.0

CMD ["tail", "-f", "/dev/null"]