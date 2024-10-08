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
  const dateObj = new Date(str)

  if(isNaN(dateObj.getTime())) return null

  const month = dateObj.toLocaleDateString("en-US", {
      month: "2-digit"
  })
  const day = dateObj.toLocaleDateString("en-US", {
      day: "2-digit"
  })
  return `${dateObj.getFullYear()}-${month}-${day}`
}


module.exports = {
    durationToMilliseconds,
    handleSpotifyMalformedDate
}