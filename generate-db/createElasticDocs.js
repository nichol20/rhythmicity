const fs = require("node:fs")
const path = require("node:path")
const tracks = require('./data/app/tracks.json')
const artists = require('./data/app/artists.json')
const albums = require('./data/app/albums.json')
const docsPath = path.resolve(__dirname, './data/elastic')

const createTrackDocuments = async () => {
    const trackDocs = tracks.map(track => ({
            id: track.id,
            name: track.spotify.title,
            artists: track.artistIds.map(id => {
                const artist = artists.find(art => art.id === id)
                return {
                    id: artist.id,
                    name: artist.name
                }
            }),
            album: function(){
                const album = albums.find(alb => alb.id === track.albumId)

                return {
                    id: album.id,
                    name: album.name
                }
            }(),
            explicit: track.explicit,
            playCount: track.playCount,
            popularity: track.spotify.popularity,
            durationMs: track.youtube.durationMs,
            genres: track.genres,
            styles: track.styles,
            images: track.spotify.albumImages,
            lyrics: track.lyrics,
            type: track.type
    }))

    const trackDocsStr = JSON.stringify(trackDocs)
    await fs.promises.writeFile(`${docsPath}/tracks.json`, trackDocsStr)
}

const createArtistDocuments = async () => {
    const artistDocs = artists.map(artist => ({
        id: artist.id,
        name: artist.name,
        genres: artist.genres,
        styles: artist.styles,
        images: artist.spotify.images,
        popularity: artist.spotify.popularity,
        type: artist.type
    }))

    const artistDocsStr = JSON.stringify(artistDocs)
    await fs.promises.writeFile(`${docsPath}/artists.json`, artistDocsStr)
}

const createAlbumDocuments = async () => {
    const albumDocs = albums.map(album => ({
        id: album.id,
        name: album.name,
        artists: album.artistIds.map(id => {
            const artist = artists.find(art => art.id === id)
            return {
                id: artist.id,
                name: artist.name
            }
        }),
        genres: album.genres,
        styles: album.styles,
        popularity: album.spotify.popularity,
        totalTracks: album.totalTracks,
        releaseDate: album.spotify.releaseDate,
        images: album.spotify.images,
        type: album.type
    }))

    const albumsDocsStr = JSON.stringify(albumDocs)
    await fs.promises.writeFile(`${docsPath}/albums.json`, albumsDocsStr)
}

const createDocs = async () => {
    fs.mkdirSync(docsPath, { recursive: true })
    await createTrackDocuments()
    await createArtistDocuments()
    await createAlbumDocuments()
}

createDocs()