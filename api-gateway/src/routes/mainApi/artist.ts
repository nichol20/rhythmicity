import express from "express"
import { getArtist, getArtistAlbums, getArtistTracks, getPopularArtists, getSeveralArtists } from "../../controllers/mainApi/artist"

const router = express.Router()

router.get("/artists", getSeveralArtists)
router.get("/popular/artists", getPopularArtists)
router.get("/artists/:id/tracks", getArtistTracks)
router.get("/artists/:id/albums", getArtistAlbums)
router.get("/artists/:id", getArtist)

export default router