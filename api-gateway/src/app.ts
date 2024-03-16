import express from "express"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/healthCheck', (req, res) => {
    res.send("Everything is alright!😉")
})

app.listen(port, () => {
    console.log(`API Gateway is listening at http://localhost:${port}`)
})