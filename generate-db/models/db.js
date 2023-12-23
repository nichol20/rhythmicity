const fs = require("node:fs/promises")
const { durationToMilliseconds } = require("../utils/conversion")

class Database {
    #initialized = false

    constructor() {
        this.dbPath = './data/app'
        this.tracks = []
        this.artists = []
        this.albums = []
    }

    #requireDbInitialization = () => {
        if(!this.#initialized) throw new Error('Initialize the Database!')
    }

    async init() {
        try {
            const [tracksBuf, artistsBuf, albumsBuf] = await Promise.all([
                fs.readFile(`${this.dbPath}/tracks.json`),
                fs.readFile(`${this.dbPath}/artists.json`),
                fs.readFile(`${this.dbPath}/albums.json`)
            ])

            this.tracks = JSON.parse(tracksBuf)
            this.artists = JSON.parse(artistsBuf)
            this.albums = JSON.parse(albumsBuf)

            this.#initialized = true
        } catch (error) {
            console.error(error.message)
            throw new Error('Error initializing database.')
        }
    }

    save = async () => {
        this.#requireDbInitialization()
        try {
            const albumsStr = JSON.stringify(this.albums)
            const artistsStr = JSON.stringify(this.artists)
            const tracksStr = JSON.stringify(this.tracks)
        
            await Promise.all([
                fs.writeFile(`${this.dbPath}/tracks.json`, tracksStr),
                fs.writeFile(`${this.dbPath}/artists.json`, artistsStr),
                fs.writeFile(`${this.dbPath}/albums.json`, albumsStr),
            ])

            console.log(`Data stored:\n`, {
                tracks: this.tracks.length,
                artists: this.artists.length,
                albums: this.albums.length,
            })
        } catch (error) {
            console.log(error.message)
            throw new Error('Error saving data.')
        }
    }

    findTrackBySpotifyId = trackSpotifyId => this.tracks.find(track => track.spotify.id === trackSpotifyId)

    findArtistBySpotifyId = artistSpotifyId => this.artists.find(artist => artist.spotify.id === artistSpotifyId)

    findAlbumBySpotifyId = albumSpotifyId => this.albums.find(album => album.spotify.id === albumSpotifyId)

    addTrack = ({ track, trackId, lyrics, artistIds, albumId, albumImages, videoData, genres, styles }) => {
        this.tracks.push({
            id: trackId, // id generated by code
            artistIds,
            albumId,
            genres, // genres generated by discogs api
            styles, // styles generated by discogs api
            explicit: track.explicit,
            playCount: 0,
            spotify: {
                id: track.id, // id generated by spotify
                title: track.name,
                popularity: track.popularity,
                durationMs: track.duration_ms,
                albumImages: albumImages
            },
            youtube: {
                id: videoData.id, // id generated by youtube
                title: videoData.snippet.title,
                durationMs: durationToMilliseconds(videoData.contentDetails.duration),
                publishedAt: videoData.snippet.publishedAt,
                statistics: videoData.statistics,
                thumbnails: videoData.snippet.thumbnails
            },
            lyrics,
            type: "track"
        })
    }

    addArtist = ({ artist, artistId }) => {
        this.artists.push({
            id: artistId, // id generated by code
            name: artist.name,
            genres: artist.genres, // genres generated by spotify api
            spotify: {
                id: artist.id, // id generated by spotify
                popularity: artist.popularity,
                images: artist.images
            },
            type: "artist"
        })
        
    }

    addAlbum = ({ album, albumId, trackId, artistIds, genres, styles }) => {
        this.albums.push({
            id: albumId, // id generated by code
            name: album.name,
            artistIds: artistIds,
            trackIds: [trackId],
            genres, // genres generated by discogs api
            styles, // styles generated by discogs api
            spotify: {
                id: album.id, // id generated by spotify
                popularity: album.popularity,
                images: album.images,
                releaseDate: album.release_date,
            },
            type: "album"
        })
    }
}

module.exports = { Database }