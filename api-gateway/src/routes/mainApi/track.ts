import express from "express"
import { getTrack, getPopularTracks, getSeveralTracks, getTrackArtists, getTrackAlbum } from '../../controllers/mainApi/track'

const router = express.Router()

router.get("/popular/tracks", getPopularTracks)
router.get("/tracks/:id/artists", getTrackArtists)
router.get("/tracks/:id/album", getTrackAlbum)
router.get("/tracks", getSeveralTracks)
router.get("/tracks/:id", getTrack)

export default router