const { default: axios } = require("axios")

class Spotify {
    apiBaseUrl = 'https://api.spotify.com/v1'
    #clientId = ''
    #clientSecret = ''
    accessToken = ''
    
    constructor({ clientId, clientSecret }) {
        this.#clientId = clientId
        this.#clientSecret = clientSecret
    }

    #requireAccessToken = () => {
        if(!this.accessToken) {
            throw new Error('You do not have a spotify access token.')
        }
    }

    getAccessToken = async () => {
        try {
            // get spotify access token
            const { data } = await axios.request({
                method: 'POST',
                url: 'https://accounts.spotify.com/api/token',
                data:{
                    grant_type: 'client_credentials',
                    client_id: this.#clientId,
                    client_secret: this.#clientSecret
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        
            // 1 hour access token
            this.accessToken = data.access_token
        } catch (error) {
            console.error(error)
            throw new Error('Failed to retrieve Spotify access token.')
        }
    }

    getPopularTracks = async ({ limit, seedGenres, minPopularity }) => {
        this.#requireAccessToken()
        const params = {
            limit,
            seed_genres: seedGenres, // ex: "hip-hop,electronic"
            min_popularity: minPopularity
        }
    
        try {
            // get popular tracks from spotify
            const { data } = await axios.request({
                method: 'GET',
                url: `${this.apiBaseUrl}/recommendations`,
                params,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                },
            })
        
            return data
        } catch (error) {
            console.error(error)
            throw new Error('Failed to retrieve popular tracks from Spotify.')
        }
    }

    getAlbum = async albumId => {
        this.#requireAccessToken()
        try {
            const { data } = await axios.request({
                method: 'GET',
                url: `${this.apiBaseUrl}/albums/${albumId}`,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            })
        
            return data
        } catch (error) {
            console.error(error)
            throw new Error('Failed to retrieve album from Spotify')
        }
    }

    getArtist = async artistId => {
        this.#requireAccessToken()
        try {
            const { data } = await axios.request({
                method: 'GET',
                url: `${this.apiBaseUrl}/artists/${artistId}`,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                },
            })
        
            return data 
        } catch (error) {
            console.error(error)
            throw new Error('Failed to retrieve artist from Spotify')
        }
    }
}


module.exports = { Spotify }