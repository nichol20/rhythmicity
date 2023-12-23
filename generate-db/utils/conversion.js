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

module.exports = {
    durationToMilliseconds
}