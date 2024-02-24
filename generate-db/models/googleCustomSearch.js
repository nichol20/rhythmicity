const { default: axios } = require("axios")
const cheerio = require('cheerio')

class GoogleCustomSearch {
    apiBaseUrl = 'https://www.googleapis.com/customsearch/v1'
    discogsApiBaseUrl = 'https://api.discogs.com'
    #apikey = ''

    constructor({ apiKey }) {
        this.#apikey = apiKey
    }

    // extract lyrics from genius lyrics page
    #extractLyrics = html => {
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

    getLyrics = async ({ title, artist }) => {
        try {
            const query = `${artist} ${title} lyrics`
            const searchEngineId = '81d84266074974c52' // search only on the genius website
            const url = `${this.apiBaseUrl}?q=${encodeURIComponent(query)}&key=${this.#apikey}&cx=${searchEngineId}`
        
            const { data: customSearchData } = await axios.get(url)
            const { data: html } = await axios.get(customSearchData.items[0].link)
        
            return this.#extractLyrics(html)
        } catch (error) {
            console.error(error)
            throw new Error('Failed to retrieve Lyrics.')
        }
    }

    // fetching genres from another api, because the spotify api is unable to return track and album genres since 2015 apparently (I'm in 2023)
    getGenresAndStyles = async ({ albumName, artist }) => {
        try {
            const query = `${artist} ${albumName} master`
            const searchEngineId = '5572903da5c1b4cf3' // search only on the discogs website
            const url = `${this.apiBaseUrl}?q=${encodeURIComponent(query)}&key=${this.#apikey}&cx=${searchEngineId}`
        
            const { data: googleSearchData } = await axios.get(url)
            // link example: https://www.discogs.com/master/1291018-Lil-Peep-Live-Forever
            const masterId = googleSearchData.items[0].link.split('master/')[1]?.split('-')[0]
            if(masterId) {
                const { data: discogsMasterData } = await axios.get(`${this.discogsApiBaseUrl}/masters/${masterId}`)
            
                return { 
                    genres: discogsMasterData.genres ? discogsMasterData.genres : [], 
                    styles: discogsMasterData.styles ? discogsMasterData.styles : []
                }
            }
        
            return { genres: [], styles: [] }
        } catch (error) {
            console.error(error)
            throw new Error('Failed to retrieve genres and styles.')
        }
    }
}

module.exports = { GoogleCustomSearch }