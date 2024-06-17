import express from "express"
import {
    getTrack,
    getPopularTracks,
    getSeveralTracks,
    getTrackArtists,
    getTrackAlbum,
    playback
} from '../../controllers/mainApi/track'
import { mustBeAuthenticated } from "../../middlewares/mustBeAuthenticated"

const router = express.Router()

router.get("/tracks", mustBeAuthenticated, getSeveralTracks)
router.get("/tracks/:id/artists", mustBeAuthenticated, getTrackArtists)
router.get("/tracks/:id/album", mustBeAuthenticated, getTrackAlbum)
router.get("/tracks/:id", mustBeAuthenticated, getTrack)

router.get("/popular/tracks", mustBeAuthenticated, getPopularTracks)

router.post("/playback", mustBeAuthenticated, playback)

export default router