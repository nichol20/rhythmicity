ARG GO_VERSION

FROM golang:${GO_VERSION}-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY *.go ./

CMD ["tail", "-f", "/dev/null"]