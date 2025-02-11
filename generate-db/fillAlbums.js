const { v4: uuidv4 } = require('uuid')
const { Database, GoogleCustomSearch, Spotify, Youtube } = require('./models')

require('dotenv').config()
const args = function() {
    const args = require('./utils/args').getArgs()
    if(args.index) {
        const value = parseInt(args.index)
        if(isNaN(value)) throw new Error("index flag must be a number.")
        args.index = value
    }

    return args
}()

const db = new Database()
const spotify = new Spotify({ clientId: process.env.SPOTIFY_CLIENT_ID, clientSecret: process.env.SPOTIFY_CLIENT_SECRET })
const youtube = new Youtube({ apiKey: process.env.GOOGLE_API_KEY })
const googleCustomSearch = new GoogleCustomSearch({ apiKey: process.env.GOOGLE_API_KEY })

const fetchData = async track => {
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

    return {
        artistsData,
        videoData,
        lyrics
    }
}

const createData = ({ artistsData, videoData, lyrics, album, track }) => {
    const trackId = uuidv4()

    const artistIds = artistsData.map((artist) => {
        // if the artist contains the '_exists' property it means it already exists
        if('_exists' in artist) {
            db.updateArtist(artist.id, () => {
                const { _exists, ...art } = artist
                art.genres = [...new Set(art.genres.concat(album.genres ? album.genres : []))]
                art.styles = [...new Set(art.styles.concat(album.styles ? album.styles : []))]
                return art
            })
            return artist.id
        }

        const artistId = uuidv4()
        db.addArtist({ artist, artistId, genres: album.genres, styles: album.styles })

        return artistId
    })  

    db.updateAlbum(album.id, alb => {
        alb.trackIds.push(trackId)
        artistIds.forEach(artId => {
            if(!alb.artistIds.includes(artId)) {
                alb.artistIds.push(artId)
            }
        })

        return alb
    })

    // create track record
    db.addTrack({ 
        track, 
        lyrics,
        videoData, 
        trackId, 
        artistIds,
        albumId: album.id,
        genres: album.genres,
        styles: album.styles,
        albumImages: album.spotify.images 
    })  
}

const fillAlbums = async () => {
    const startIndex = args.index ? args.index : 0
    let currentTrack = ""
    let currentIndex = -1
    try {
        await spotify.getAccessToken()
        console.log('spotify access token: ', spotify.accessToken)
        
        for(const album of db.albums) {
            currentIndex++
            if(currentIndex < startIndex) continue

            const spotifyAlbum = await spotify.getAlbum(album.spotify.id)
            console.log(`album ${spotifyAlbum.name}: `)

            for(const track of spotifyAlbum.tracks.items) {

                currentTrack = track.name
                if(db.findTrackBySpotifyId(track.id)) {
                    console.log(`track '${track.name}' already exist`)
                } else {
                    const data = await fetchData(track)
                    createData({...data, track, album })
                    await db.save()
                    console.log(`${db.getCurrentRunDataCount().tracks}: track '${track.name}' created successfully`)
                }
            }
            console.log(`-`.repeat(20))
        }
    } catch (error) {
        console.error(error)
        console.error("Error when trying to process the track: " + currentTrack)
    } finally {
        console.log(`\n${'-'.repeat(10)} STATISTICS ${'-'.repeat(10)}`)
        console.log("Data stored in the current run:\n", db.getCurrentRunDataCount())
        console.log("Total data stored:\n", db.getDataCount())
    }
}

fillAlbums()