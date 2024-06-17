import express from "express"
import {
    getArtist,
    getArtistAlbums,
    getArtistTracks,
    getPopularArtists,
    getSeveralArtists
} from "../../controllers/mainApi/artist"
import { mustBeAuthenticated } from "../../middlewares/mustBeAuthenticated"

const router = express.Router()

router.get("/artists", mustBeAuthenticated, getSeveralArtists)
router.get("/artists/:id/tracks", mustBeAuthenticated, getArtistTracks)
router.get("/artists/:id/albums", mustBeAuthenticated, getArtistAlbums)
router.get("/artists/:id", mustBeAuthenticated, getArtist)

router.get("/popular/artists", mustBeAuthenticated, getPopularArtists)

export default router