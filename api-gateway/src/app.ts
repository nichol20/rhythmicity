import express from "express"
import mainApiTrackRouter from "./routes/mainApi/track"
import mainApiArtistRouter from "./routes/mainApi/artist"
import mainApiAlbumRouter from "./routes/mainApi/album"
import acceptOnlyNginx from './middlewares/acceptOnlyNginx'
import "dotenv/config"

const app = express()
const port = process.env.PORT || 3000

app.use(acceptOnlyNginx)
app.use(express.json())
app.use(mainApiTrackRouter)
app.use(mainApiArtistRouter)
app.use(mainApiAlbumRouter)

app.get('/', async (req, res) => {
    res.send('Rhythmicity')
})

app.get('/health-check', (req, res) => {
    res.send("Everything is alright!😉")
})

app.listen(port, () => {
    if(!process.env.NGINX_IP) {
        console.error("Error: NGINX_IP not defined")
        process.exit(1)
    }
    console.log(`API Gateway is serving at http://localhost:${port}`)
})