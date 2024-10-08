const { v4: uuidv4 } = require('uuid')
const { Database, GoogleCustomSearch, Spotify, Youtube } = require('./models')

require('dotenv').config()
const args = function() {
    const args = require('./utils/args').getArgs()

    if(args.limit) {
        const value = parseInt(args.limit)
        if(isNaN(value)) throw new Error("limit flag must be a number.")
        args.limit = value
    }

    return args
}()

const db = new Database()
const spotify = new Spotify({ clientId: process.env.SPOTIFY_CLIENT_ID, clientSecret: process.env.SPOTIFY_CLIENT_SECRET })
const youtube = new Youtube({ apiKey: process.env.GOOGLE_API_KEY })
const googleCustomSearch = new GoogleCustomSearch({ apiKey: process.env.GOOGLE_API_KEY })

const fetchData = async track => {
    // checks if the album already exists in the database using spotify id, if not, search for it in the spotify api
    const existingAlbum = db.findAlbumBySpotifyId(track.album.id)
    // variable can be two types of object
    const albumData = existingAlbum ? {...existingAlbum, _exists: true} : await spotify.getAlbum(track.album.id) 

    const artistNames = []
    // checks if the artist already exists in the database using spotify id, if not, search for it in the spotify api
    // array with two types of objects
    const artistsData = await Promise.all(
        track.artists.map(artist => {
            artistNames.push(artist.name)

            const existingArtist = db.findArtistBySpotifyId(artist.id)
            if(existingArtist) return {...existingArtist, _exists: true }

            return spotify.getArtist(artist.id)
        })
    )

    const foundVideo = await youtube.searchVideo(`${track.name} by ${artistNames.join(', ')}`)
    if(!foundVideo) throw new Error('No youtube video found')

    const videoData = await youtube.getVideo(foundVideo.id.videoId)
    const lyrics = await googleCustomSearch.getLyrics({ title: track.name,  artist: artistNames[0] })
    const { genres, styles } = await googleCustomSearch.getGenresAndStyles({ albumName: albumData.name, artist: artistNames[0]})

    const extraData = {
        lyrics,
        genres,
        styles
    }

    return {
        albumData,
        artistsData,
        videoData,
        extraData
    }
}

const createData = ({ albumData, artistsData, videoData, extraData, track }) => {
    const trackId = uuidv4()
    let albumId = albumData.id

    db.addGenres(extraData.genres ? extraData.genres : [])
    db.addStyles(extraData.styles ? extraData.styles : [])

    const artistIds = artistsData.map((artist) => {
        // if the artist contains the '_exists' property it means it already exists
        if('_exists' in artist) {
            db.updateArtist(artist.id, () => {
                const { _exists, ...art } = artist
                art.genres = [...new Set(art.genres.concat(extraData.genres ? extraData.genres : []))]
                art.styles = [...new Set(art.styles.concat(extraData.styles ? extraData.styles : []))]
                return art
            })
            return artist.id
        }

        const artistId = uuidv4()
        db.addArtist({ artist, artistId, genres: extraData.genres, styles: extraData.styles })

        return artistId
    })  

    if('_exists' in albumData) {
        db.updateAlbum(albumData.id, album => {
            album.trackIds.push(trackId)

            // check if there are already artists in the album data and adds them if not
            artistIds.forEach(id => {
                if(!album.artistIds.includes(id)) {
                    album.artistIds.push(id)
                }
            })

            return album
        })
    } else {
        albumId = uuidv4()
        db.addAlbum({ album: albumData, albumId, trackId, artistIds, genres: extraData.genres, styles: extraData.styles })
    }

    db.addTrack({ 
        track, 
        lyrics: extraData.lyrics,
        videoData, 
        trackId, 
        artistIds,
        albumId,
        genres: extraData.genres,
        styles: extraData.styles,
        albumImages: '_exists' in albumData ? albumData.spotify.images : albumData.images 
    })   
}

const generateData = async () => {
    let currentTrack = ""

    try {
        const seedGenres = args.genres ? args.genres : "hip-hop,electronic"
        const limit = args.limit ? args.limit : 100

        await spotify.getAccessToken()
        console.log('spotify access token: ', spotify.accessToken)
        
        console.log('Searching for popular tracks...')
        const popularTracks = await spotify.getPopularTracks({
            limit,
            seedGenres,
            minPopularity: 75
        })  
        console.log(`${popularTracks.tracks.length} track(s) found.`)

        console.log('Fetching and creating data...')
        console.log('-'.repeat(20))
        for(const track of popularTracks.tracks) {
            currentTrack = track.name
            if(db.findTrackBySpotifyId(track.id)) {
                console.log(`track '${track.name}' already exist`)
            } else {
                const data = await fetchData(track)
                createData({...data, track })
                await db.save()
                console.log(`${db.getCurrentRunDataCount().tracks}: track '${track.name}' created successfully`)
            }
        }
        console.log('-'.repeat(20))

        console.log('Done!')
    } catch (error) {
        console.error(error)
        console.error("Error when trying to process the track: " + currentTrack)
    } finally {
        console.log(`\n${'-'.repeat(10)} STATISTICS ${'-'.repeat(10)}`)
        console.log("Data stored in the current run:\n", db.getCurrentRunDataCount())
        console.log("Total data stored:\n", db.getDataCount())
    }
}

generateData()