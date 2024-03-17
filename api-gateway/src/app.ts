import express from "express"
import mainApiTrackRouter from "./routes/mainApi/track"
import mainApiArtistRouter from "./routes/mainApi/artist"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(mainApiTrackRouter)
app.use(mainApiArtistRouter)

app.get('/healthCheck', (req, res) => {
    res.send("Everything is alright!😉")
})

app.listen(port, () => {
    console.log(`API Gateway is serving at http://localhost:${port}`)
})