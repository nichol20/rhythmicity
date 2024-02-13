CREATE DATABASE IF NOT EXISTS rhythmicity;

------ ARTISTS ------

CREATE TABLE IF NOT EXISTS artist_genres (
    id SERIAL PRIMARY KEY NOT NULL,
    genre TEXT NOT NULL,
);

CREATE TABLE IF NOT EXISTS artist_images_spotify (
    id SERIAL PRIMARY KEY NOT NULL,
    url TEXT NOT NULL,
    height INT NOT NULL,
    width INT NOT NULL
);

CREATE TABLE IF NOT EXISTS artist_data_spotify (
    id TEXT PRIMARY KEY NOT NULL,
    popularity INT NOT NULL
    artistImagesId INT FOREIGN KEY REFERENCES artist_images_spotify(id)
);

CREATE TABLE IF NOT EXISTS artists (
    id UUID PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    spotifyId TEXT FOREIGN KEY REFERENCES artist_data_spotify(id)
);

CREATE TABLE IF NOT EXISTS artists_artist_genres (
    artistId UUID NOT NULL,
    genreId INT NOT NULL,
    FOREIGN KEY (artistId) REFERENCES artists(id),
    FOREIGN KEY (genreId) REFERENCES artist_genres(id),
    PRIMARY KEY (artistId, genreId)
);

------ GENRES AND STYLES ------

CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY NOT NULL,
    genre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS styles (
    id SERIAL PRIMARY KEY NOT NULL,
    style TEXT NOT NULL
);

------ ALBUMS ------

CREATE TABLE IF NOT EXISTS album_images_spotify (
    id SERIAL PRIMARY KEY NOT NULL,
    url TEXT NOT NULL,
    height INT NOT NULL,
    width INT NOT NULL
);

CREATE TABLE IF NOT EXISTS album_data_spotify (
    id TEXT PRIMARY KEY NOT NULL,
    popularity INT NOT NULL,
    releaseDate DATE NOT NULL,
    albumImagesId INT FOREIGN KEY REFERENCES album_images_spotify(id)
);

CREATE TABLE IF NOT EXISTS albums (
    id UUID PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    totalTracks INT NOT NULL,
    spotifyId TEXT FOREIGN KEY REFERENCES album_data_spotify(id)
);

CREATE TABLE IF NOT EXISTS albums_genres (
    albumId UUID NOT NULL,
    genreId INT NOT NULL,
    FOREIGN KEY (albumId) REFERENCES albums(id),
    FOREIGN KEY (genreId) REFERENCES genres(id),
    PRIMARY KEY (albumId, genreId)
);

CREATE TABLE IF NOT EXISTS albums_styles (
    albumId UUID NOT NULL,
    styleId INT NOT NULL,
    FOREIGN KEY (albumId) REFERENCES albums(id),
    FOREIGN KEY (styleId) REFERENCES styles(id),
    PRIMARY KEY (albumId, styleId)
);

------ TRACKS ------

CREATE TABLE IF NOT EXISTS track_statistics_youtube (
    id SERIAL PRIMARY KEY NOT NULL,
    viewCount TEXT NOT NULL,
    likeCount TEXT NOT NULL,
    favoriteCount TEXT NOT NULL,
    commentCount TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS track_thumbnails_youtube (
    id SERIAL PRIMARY KEY NOT NULL,
    url TEXT NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS track_data_youtube (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    durationMs INT NOT NULL,
    publishedAt DATE NOT NULL,
    statisticsId INT FOREIGN KEY REFERENCES track_statistics_youtube(id),
    thumbnailsId INT FOREIGN KEY REFERENCES track_thumbnails_youtube(id)
);


CREATE TABLE IF NOT EXISTS track_data_spotify (
    id PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    durationMs INT NOT NULL,
    albumSpotifyId TEXT FOREIGN KEY REFERENCES album_data_spotify(id)
);

CREATE TABLE IF NOT EXISTS tracks (
    id UUID PRIMARY KEY NOT NULL,
    albumId UUID PRIMARY KEY, 
    explicit BOOLEAN NOT NULL,
    playCount INT NOT NULL,
    lyrics TEXT
);

CREATE TABLE IF NOT EXISTS artists_tracks (
    track_id UUID NOT NULL,
    artist_id UUID NOT NULL,
    FOREIGN KEY (track_id) REFERENCES tracks(id),
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
    PRIMARY KEY (track_id, artist_id)
);