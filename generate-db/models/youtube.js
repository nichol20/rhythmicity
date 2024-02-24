const { default: axios } = require("axios")

class Youtube {
    apiBaseUrl = 'https://youtube.googleapis.com/youtube/v3'
    #apiKey = ''
    #currentQuery = ''
    #currentVideo = null

    constructor({ apiKey }) {
        this.#apiKey = apiKey
    }

    searchVideo = async query => {
        this.#currentQuery = query
        try {
            const params = {
                part: 'snippet',
                maxResults: 1,
                q: query,
                topicId: '/m/04rlf', // Music (parent topic)
                type: 'video',
                key: this.#apiKey
            }
        
            const { data } = await axios.get(`${this.apiBaseUrl}/search`, { params })
            this.#currentVideo = data.items[0]
            return data.items[0]
        } catch (error) {
            console.error(error)
            throw new Error('Failed to search video from Youtube. Query: ', query)
        }
    }

    getVideo = async videoId => { 
        try {
            const parts = ['contentDetails', 'snippet', 'statistics'].map(part => `part=${part}`).join('&')
            const params = {
                id: videoId,
                key: this.#apiKey
            }
        
            const { data } = await axios.get(`${this.apiBaseUrl}/videos?${parts}`, { params })
            return data.items[0]
        } catch (error) {
            console.error(error)
            throw new Error("Failed to get video from Youtube.\n",
            `youtube id: ${videoId}, query used: ${this.#currentQuery}, found video: ${this.#currentVideo} `)
        }
    }
}


module.exports = { Youtube }