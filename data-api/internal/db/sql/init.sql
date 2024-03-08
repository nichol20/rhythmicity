--CREATE DATABASE IF NOT EXISTS rhythmicity;

------ GENRES AND STYLES ------
CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY NOT NULL,
    genre TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS styles (
    id SERIAL PRIMARY KEY NOT NULL,
    style TEXT NOT NULL
);

------ ARTISTS ------
CREATE TABLE IF NOT EXISTS artist_data_spotify (
    id TEXT PRIMARY KEY NOT NULL,
    popularity INT NOT NULL
);

CREATE TABLE IF NOT EXISTS artist_images_spotify (
    id SERIAL PRIMARY KEY NOT NULL,
    url TEXT NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    spotifyId TEXT NOT NULL,
    FOREIGN KEY (spotifyId) REFERENCES artist_data_spotify(id)
);

CREATE TABLE IF NOT EXISTS artists (
    id UUID PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    spotifyId TEXT,
    FOREIGN KEY (spotifyId) REFERENCES artist_data_spotify(id)
);

CREATE TABLE IF NOT EXISTS artists_genres (
    artistId UUID NOT NULL,
    genreId INT NOT NULL,
    FOREIGN KEY (artistId) REFERENCES artists(id),
    FOREIGN KEY (genreId) REFERENCES genres(id),
    PRIMARY KEY (artistId, genreId)
);

CREATE TABLE IF NOT EXISTS artists_styles (
    artistId UUID NOT NULL,
    styleId INT NOT NULL,
    FOREIGN KEY (artistId) REFERENCES artists(id),
    FOREIGN KEY (styleId) REFERENCES styles(id),
    PRIMARY KEY (artistId, styleId)
);

------ ALBUMS ------
CREATE TABLE IF NOT EXISTS album_data_spotify (
    id TEXT PRIMARY KEY NOT NULL,
    popularity INT NOT NULL,
    releaseDate DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS album_images_spotify (
    id SERIAL PRIMARY KEY NOT NULL,
    url TEXT NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    spotifyId TEXT NOT NULL,
    FOREIGN KEY (spotifyId) REFERENCES album_data_spotify(id)
);

CREATE TABLE IF NOT EXISTS albums (
    id UUID PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    totalTracks INT NOT NULL,
    spotifyId TEXT NOT NULL,
    FOREIGN KEY (spotifyId) REFERENCES album_data_spotify(id)
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

CREATE TABLE IF NOT EXISTS artists_albums (
    artistId UUID NOT NULL,
    albumId UUID NOT NULL,
    FOREIGN KEY (artistId) REFERENCES artists(id),
    FOREIGN KEY (albumId) REFERENCES albums(id),
    PRIMARY KEY (artistId, albumId)
);

------ TRACKS ------
CREATE TABLE IF NOT EXISTS track_data_youtube (
    id UUID PRIMARY KEY NOT NULL,
    youtubeId TEXT NOT NULL,
    title TEXT NOT NULL,
    durationMs INT NOT NULL,
    publishedAt DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS track_statistics_youtube (
    id UUID PRIMARY KEY NOT NULL,
    viewCount TEXT NOT NULL,
    likeCount TEXT NOT NULL,
    favoriteCount TEXT NOT NULL,
    commentCount TEXT NOT NULL,
    youtubeDataId UUID NOT NULL,
    FOREIGN KEY (youtubeDataId) REFERENCES track_data_youtube(id)
);

CREATE TABLE IF NOT EXISTS track_thumbnails_youtube (
    id SERIAL PRIMARY KEY NOT NULL,
    url TEXT NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    type TEXT NOT NULL,
    youtubeDataId UUID NOT NULL,
    FOREIGN KEY (youtubeDataId) REFERENCES track_data_youtube(id)
);

CREATE TABLE IF NOT EXISTS track_data_spotify (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    popularity INT NOT NULL,
    durationMs INT NOT NULL
);

CREATE TABLE IF NOT EXISTS tracks (
    id UUID PRIMARY KEY NOT NULL,
    albumId UUID NOT NULL, 
    explicit BOOLEAN NOT NULL,
    playCount INT NOT NULL,
    spotifyId TEXT NOT NULL,
    youtubeDataId UUID NOT NULL,
    lyrics TEXT,
    FOREIGN KEY (albumId) REFERENCES albums(id),
    FOREIGN KEY (spotifyId) REFERENCES track_data_spotify(id),
    FOREIGN KEY (youtubeDataId) REFERENCES track_data_youtube(id)
);

CREATE TABLE IF NOT EXISTS tracks_genres (
    trackId UUID NOT NULL,
    genreId INT NOT NULL,
    FOREIGN KEY (trackId) REFERENCES tracks(id),
    FOREIGN KEY (genreId) REFERENCES genres(id),
    PRIMARY KEY (trackId, genreId)
);

CREATE TABLE IF NOT EXISTS tracks_styles (
    trackId UUID NOT NULL,
    styleId INT NOT NULL,
    FOREIGN KEY (trackId) REFERENCES tracks(id),
    FOREIGN KEY (styleId) REFERENCES styles(id),
    PRIMARY KEY (trackId, styleId)
);

CREATE TABLE IF NOT EXISTS artists_tracks (
    artistId UUID NOT NULL,
    trackId UUID NOT NULL,
    FOREIGN KEY (artistId) REFERENCES artists(id),
    FOREIGN KEY (trackId) REFERENCES tracks(id),
    PRIMARY KEY (artistId, trackId)
);