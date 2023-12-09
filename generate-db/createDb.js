const fs = require("node:fs/promises")
const { v4: uuidv4 } = require('uuid')
const { default: axios } = require("axios")

require('dotenv').config()

const spotifyApiBaseUrl = 'https://api.spotify.com/v1'
const youtubeApiBaseUrl = 'https://youtube.googleapis.com/youtube/v3'
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
let SPOTIFY_ACCESS_TOKEN = ''

const database = {
    artists: [],
    albums: [],
    tracks: []
}

const getSpotifyAccessToken = async () => {
    // get spotify access token
    const { data } = await axios.request({
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        data:{
            grant_type: 'client_credentials',
            client_id: SPOTIFY_CLIENT_ID,
            client_secret: SPOTIFY_CLIENT_SECRET
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    // 1 hour access token
    return data.access_token
}

const getPopularTracks = async () => {
    const params = {
        limit: 100,
        seed_genres: 'hip-hop,electronic',
        min_popularity: 75
    }

    // get popular tracks from spotify
    const { data } = await axios.request({
        method: 'GET',
        url: `${spotifyApiBaseUrl}/recommendations`,
        params,
        headers: {
            Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`
        },
    })

    return data
}

const getAlbumData = async (albumId) => {
    const { data } = await axios.request({
        method: 'GET',
        url: `${spotifyApiBaseUrl}/albums/${albumId}`,
        headers: {
            Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`
        }
    })

    return data
}

const getArtistData = async (artistId) => {
    const { data } = await axios.request({
        method: 'GET',
        url: `${spotifyApiBaseUrl}/artists/${artistId}`,
        headers: {
            Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`
        },
    })

    return data
}

// convert ISO 8601 to milliseconds
const durationToMilliseconds = durationString => {
    const regex = /PT(?:(\d+)M)?(?:(\d+)S)?/
    const matches = durationString.match(regex)
    
    if (!matches) {
      throw new Error('Invalid duration string format')
    }
    
    const minutes = matches[1] ? parseInt(matches[1], 10) : 0
    const seconds = matches[2] ? parseInt(matches[2], 10) : 0
    
    // Calculate the total duration in milliseconds
    const totalMilliseconds = (minutes * 60 + seconds) * 1000
    
    return totalMilliseconds
}

const getYoutubeVideoData = async videoId => {
    const parts = ['contentDetails', 'snippet', 'statistics'].map(part => `part=${part}`).join('&')
    const params = {
        id: videoId,
        key: YOUTUBE_API_KEY
    }

    const { data } = await axios.get(`${youtubeApiBaseUrl}/videos?${parts}`, { params })
    return data.items[0]
}

// returns the first video it finds 
const searchYoutubeVideo = async query => {
    const params = {
        part: 'snippet',
        maxResults: 1,
        q: query,
        key: YOUTUBE_API_KEY
    }

    const { data } = await axios.get(`${youtubeApiBaseUrl}/search`, { params })
    return data.items[0]
}

const fetchData = async track => {
    const albumData = albumExists(track.album.id) ? null : await getAlbumData(track.album.id)
    const artistNames = []
    const artistsData = await Promise.all(
        Array(track.artists.length)
            .fill('')
            .map((_, index) => {
                if(!artistExists(track.artists[index].id)) {
                    artistNames.push(track.artists[index].name)
                    return getArtistData(track.artists[index].id)
                }
                return null
            })
    )

    // find the video on youtube of this track
    const foundVideo = await searchYoutubeVideo(`${track.name} by ${artistNames.join(', ')}`)
    if(!foundVideo) throw new Error('No youtube video found')

    // fetch complete data from this video 
    const videoData = await getYoutubeVideoData(foundVideo.id.videoId)

    return {
        albumData,
        artistsData,
        videoData
    }
}

const findAlbumBySpotifyId = albumSpotifyId => database.albums.find(album => album.spotify.id === albumSpotifyId)

const albumExists = albumSpotifyId => Boolean(findAlbumBySpotifyId(albumSpotifyId))

const findArtistBySpotifyId = artistSpotifyId => database.albums.find(artist => artist.spotify.id === artistSpotifyId)

const artistExists = artistSpotifyId => Boolean(findArtistBySpotifyId(artistSpotifyId))

const createAlbumRecord = ({ album, albumId, trackId, artistIds }) => {
    database.albums.push({
        id: albumId,
        name: album.name,
        artistIds: artistIds,
        trackIds: [trackId],
        genres: album.genres,
        spotify: {
            id: album.id,
            popularity: album.popularity,
            images: album.images,
            releaseDate: album.release_date,
        },
        type: "album"
    })
}

const createArtistRecord = ({ artist, albumId, trackId, artistId }) => {
    database.artists.push({
        id: artistId,
        name: artist.name,
        trackIds: [trackId],
        albumIds: [albumId],
        genres: artist.genres,
        spotify: {
            id: artist.id,
            popularity: artist.popularity,
            images: artist.images
        },
        type: "artist"
    })
    
}

const createTrackRecord = ({ videoData, track, trackId, artistIds, genres, albumImages }) => {
    database.tracks.push({
        id: trackId,
        artistIds: artistIds,
        genres: genres,
        explicit: track.explicit,
        playCount: 0,
        spotify: {
            id: track.id,
            title: track.name,
            popularity: track.popularity,
            durationMs: track.duration_ms,
            albumImages: albumImages
        },
        youtube: {
            id: videoData.id,
            title: videoData.snippet.title,
            durationMs: durationToMilliseconds(videoData.contentDetails.duration),
            publishedAt: videoData.snippet.publishedAt,
            statistics: videoData.statistics,
            thumbnails: videoData.snippet.thumbnails
        },
        type: "track"
    })
}

const saveDb = async () => {
    const albumsStr = JSON.stringify(database.albums)
    const artistsStr = JSON.stringify(database.artists)
    const tracksStr = JSON.stringify(database.tracks)

    await fs.writeFile('./data/albums.json', albumsStr)
    await fs.writeFile('./data/artists.json', artistsStr)
    await fs.writeFile('./data/tracks.json', tracksStr)
}

const fetchAndCreateData = async track => {
    const { albumData, artistsData, videoData } = await fetchData(track)

    // if albumData equals null it means it already exists
    const trackId = uuidv4()
    const albumId = albumData ? uuidv4() : findAlbumBySpotifyId(track.album.id).id
    const artistIds = artistsData.map((artist) => {
        // if artist equals null it means it already exists
        if(artist) {
            const artistId = uuidv4()
            createArtistRecord({ artist, albumId, trackId, artistId })

            return artistId
        }

        return findArtistBySpotifyId(artist.id).id
    })  

    // create album record
    if(albumData) {
        createAlbumRecord({ album: albumData, albumId, trackId, artistIds })
    }

    // create track record
    createTrackRecord({ 
        track, 
        videoData, 
        trackId, 
        artistIds, 
        genres: albumData.genres,
        albumImages: albumData.images 
    })   
}


const generateData = async () => {
    try {
        SPOTIFY_ACCESS_TOKEN = await getSpotifyAccessToken()
        console.log('spotify access token: ', SPOTIFY_ACCESS_TOKEN)

        if(!SPOTIFY_ACCESS_TOKEN) throw new Error('No access token received')
        
        console.log('Searching for popular tracks...')
        const popularTracks = await getPopularTracks()    
        console.log(`${popularTracks.tracks.length} track(s) found.`)

        console.log('Fetching and creating data...')
        for(const track of popularTracks.tracks) {
            await fetchAndCreateData(track)
        }
        
        console.log('Writing...')
        await saveDb()
        console.log('Done!')
    } catch (error) {
        console.error('message: ', error.message)
        console.error('stack: ', error.stack)
    }
}

generateData()