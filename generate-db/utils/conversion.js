// convert ISO 8601 to milliseconds
const durationToMilliseconds = durationString => {
    const regex = /PT(?:(\d+)M)?(?:(\d+)S)?/
    const matches = durationString.match(regex)
    
    if (!matches) {
      throw new Error('Invalid duration string format')
    }
    
    const minutes = matches[1] ? parseInt(matches[1], 10) : 0
    const seconds = matches[2] ? parseInt(matches[2], 10) : 0
    
    const totalMilliseconds = (minutes * 60 + seconds) * 1000
    
    return totalMilliseconds
}

const handleSpotifyMalformedDate = str => {
  const time = new Date(str)
  return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
}


module.exports = {
    durationToMilliseconds,
    handleSpotifyMalformedDate
}