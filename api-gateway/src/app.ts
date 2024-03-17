import express from "express"
import mainApiTrackRouter from "./routes/mainApi/track"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(mainApiTrackRouter)

app.get('/healthCheck', (req, res) => {
    res.send("Everything is alright!😉")
})

app.listen(port, () => {
    console.log(`API Gateway is listening at http://localhost:${port}`)
})