import express from 'express'
import { getAlbum, getAlbumArtists, getAlbumTracks, getPopularAlbums, getSeveralAlbums } from '../../controllers/mainApi/album'

const router = express.Router()

router.get('/albums', getSeveralAlbums)
router.get('/popular/albums', getPopularAlbums)
router.get('/albums/:id/tracks', getAlbumTracks)
router.get('/albums/:id/artists', getAlbumArtists)
router.get('/albums/:id', getAlbum)

export default router