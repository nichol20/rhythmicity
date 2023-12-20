const fs = require("node:fs/promises")
const { v4: uuidv4 } = require('uuid')
const { default: axios } = require("axios")
const cheerio = require('cheerio')

require('dotenv').config()

const dbPath = './data/app'
const spotifyApiBaseUrl = 'https://api.spotify.com/v1'
const youtubeApiBaseUrl = 'https://youtube.googleapis.com/youtube/v3'
const customsearchApiBaseUrl = 'https://www.googleapis.com/customsearch/v1'
const discogsApiBaseUrl = "https://api.discogs.com"
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
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
        limit: 99, // on track 100, YouTube API returns 403 due to quota exceeded
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

const getLyrics = async ({ title, artist }) => {
    const query = `${artist} ${title} lyrics`
    const searchEngineId = '81d84266074974c52' // search only on the genius website
    const url = `${customsearchApiBaseUrl}?q=${encodeURIComponent(query)}&key=${process.env.GOOGLE_API_KEY}&cx=${searchEngineId}`

    const { data: customSearchData } = await axios.get(url)
    const { data: html } = await axios.get(customSearchData.items[0].link)

    // extract lyrics
    const $ = cheerio.load(html);
    let lyrics = $('div[class="lyrics"]').text().trim();
    if (!lyrics) {
        lyrics = ''
        $('div[class^="Lyrics__Container"]').each((_, elem) => {
            if($(elem).text().length !== 0) {
                let snippet = $(elem).html()
                  .replace(/<br>/g, '\n')
                  .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '')
                lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n'
            }
        })
    }
    if (!lyrics) return null
    return lyrics.trim()
}

// fetching genres from another api, because the spotify api is unable to return track and album genres since 2015 apparently (I'm in 2023)
const getGenresAndStyles = async ({ albumName, artist }) => {
    const query = `${artist} ${albumName} master`
    const searchEngineId = '5572903da5c1b4cf3' // search only on the discogs website
    const url = `${customsearchApiBaseUrl}?q=${encodeURIComponent(query)}&key=${process.env.GOOGLE_API_KEY}&cx=${searchEngineId}`

    const { data: googleSearchData } = await axios.get(url)
    // link example: https://www.discogs.com/master/1291018-Lil-Peep-Live-Forever
    const masterId = googleSearchData.items[0].link.split('master/')[1].split('-')[0]
    const { data: discogsMasterData } = await axios.get(`${discogsApiBaseUrl}/masters/${masterId}`)

    return { genres: discogsMasterData.genres, styles: discogsMasterData.styles }
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
        key: GOOGLE_API_KEY
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
        key: GOOGLE_API_KEY
    }

    const { data } = await axios.get(`${youtubeApiBaseUrl}/search`, { params })
    return data.items[0]
}

const fetchData = async track => {
    // checks if the album already exists in the database using spotify id, if not, search for it in the spotify api
    const existingAlbum = findAlbumBySpotifyId(track.album.id)
    // array with two types of objects
    const albumData = existingAlbum ? {...existingAlbum, _exists: true} : await getAlbumData(track.album.id) 

    const artistNames = []
    // checks if the artist already exists in the database using spotify id, if not, search for it in the spotify api
    // array with two types of objects
    const artistsData = await Promise.all(
        track.artists.map(artist => {
            artistNames.push(artist.name)

            const existingArtist = findArtistBySpotifyId(artist.id)
            if(existingArtist) return {...existingArtist, _exists: true }

            return getArtistData(artist.id)
        })
    )

    // find the video on youtube of this track
    const foundVideo = await searchYoutubeVideo(`${track.name} by ${artistNames.join(', ')}`)
    if(!foundVideo) throw new Error('No youtube video found')

    // fetch complete data from this video 
    const videoData = await getYoutubeVideoData(foundVideo.id.videoId)

    // fetch lyrics
    const lyrics = await getLyrics({ title: track.name,  artist: artistNames[0] })

    // fetch genres and styles
    const genreObj = await getGenresAndStyles({ albumName: albumData.name, artist: artistNames[0]})

    return {
        albumData,
        artistsData,
        videoData,
        lyrics,
        genreObj
    }
}

const findAlbumBySpotifyId = albumSpotifyId => database.albums.find(album => album.spotify.id === albumSpotifyId)

const findArtistBySpotifyId = artistSpotifyId => database.artists.find(artist => artist.spotify.id === artistSpotifyId)

const createAlbumRecord = ({ album, albumId, trackId, artistIds, genres, styles }) => {
    database.albums.push({
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

const createArtistRecord = ({ artist, artistId }) => {
    database.artists.push({
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

const createTrackRecord = ({ track, trackId, lyrics, artistIds, albumId, albumImages, videoData, genres, styles }) => {
    database.tracks.push({
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

const saveDb = async () => {
    const albumsStr = JSON.stringify(database.albums)
    const artistsStr = JSON.stringify(database.artists)
    const tracksStr = JSON.stringify(database.tracks)

    await fs.writeFile(`${dbPath}/albums.json`, albumsStr)
    await fs.writeFile(`${dbPath}/artists.json`, artistsStr)
    await fs.writeFile(`${dbPath}/tracks.json`, tracksStr)
}

const fetchAndCreateData = async track => {
    const { albumData, artistsData, videoData, lyrics, genreObj } = await fetchData(track)
    const trackId = uuidv4()
    let albumId = albumData.id

    const artistIds = artistsData.map((artist) => {
        // if the artist contains the '_exists' property it means it already exists
        if('_exists' in artist) return artist.id

        const artistId = uuidv4()
        createArtistRecord({ artist, artistId })

        return artistId
    })  

    if('_exists' in albumData) {
        // If the album data already exists, update it
        database.albums = database.albums.map(album => {
            if(album.id === albumData.id) {
                // add trackId
                album.trackIds.push(trackId)

                // check if there are already artists in the album data and adds them if not
                artistIds.forEach(id => {
                    if(!album.artistIds.includes(id)) {
                        album.artistIds.push(id)
                    }
                })
            }

            return album
        })
    } else {
        // create album record
        albumId = uuidv4()
        createAlbumRecord({ album: albumData, albumId, trackId, artistIds, genres: genreObj.genres, styles: genreObj.styles })
    }

    // create track record
    createTrackRecord({ 
        track, 
        lyrics,
        videoData, 
        trackId, 
        artistIds,
        albumId,
        genres: genreObj.genres,
        styles: genreObj.styles,
        albumImages: '_exists' in albumData ? albumData.spotify.images : albumData.images 
    })   
}

const generateData = async () => {
    try {
        SPOTIFY_ACCESS_TOKEN = await getSpotifyAccessToken()
        console.log('spotify access token: ', SPOTIFY_ACCESS_TOKEN)
        if(!SPOTIFY_ACCESS_TOKEN) throw new Error('No spotify access token received')
        
        console.log('Searching for popular tracks...')
        const popularTracks = await getPopularTracks()    
        console.log(`${popularTracks.tracks.length} track(s) found.`)

        console.log('Fetching and creating data...')
        console.log('-'.repeat(20))
        let pos = 0
        for(const track of popularTracks.tracks) {
            await fetchAndCreateData(track)
            console.log(`${++pos}: track '${track.name}' created successfully`)
            await saveDb()
        }
        console.log('-'.repeat(20))

        console.log('Done!')
    } catch (error) {
        console.error(error)
        console.error(error.response?.data)
        console.error(error.response?.data?.error?.errors)
    }
}

generateData()