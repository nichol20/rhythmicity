const fs = require("node:fs/promises")
const tracks = require('./data/app/tracks.json')
const artists = require('./data/app/artists.json')
const albums = require('./data/app/albums.json')

const createTrackDocuments = async () => {
    const trackDocs = tracks.map(track => ({
            id: track.id,
            trackName: track.spotify.title,
            artistNames: track.artistIds.map(id => artists.find(art => art.id === id).name),
            albumName: albums.find(alb => alb.id === track.albumId).name,
            explicit: track.explicit,
            playCount: track.playCount,
            genres: track.genres,
            youtubeId: track.youtube.id,
            imageUrl: track.spotify.albumImages[0].url,
            lyrics: track.lyrics
    }))

    const trackDocsStr = JSON.stringify(trackDocs)
    await fs.writeFile(`./data/elastic/tracks.json`, trackDocsStr)
}

createTrackDocuments()