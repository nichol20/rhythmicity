import express from "express"
import { getTrack, getPopularTracks, getSeveralTracks, getTrackArtists, getTrackAlbum, playback } from '../../controllers/mainApi/track'

const router = express.Router()

router.get("/tracks", getSeveralTracks)
router.get("/popular/tracks", getPopularTracks)
router.get("/tracks/:id/artists", getTrackArtists)
router.get("/tracks/:id/album", getTrackAlbum)
router.get("/tracks/:id", getTrack)
router.post("/playback", playback)

export default router