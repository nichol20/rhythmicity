import express from 'express'
import {
    getAlbum,
    getAlbumArtists,
    getAlbumTracks,
    getPopularAlbums,
    getSeveralAlbums
} from '../../controllers/mainApi/album'
import { mustBeAuthenticated } from '../../middlewares/mustBeAuthenticated'

const router = express.Router()

router.get('/albums', mustBeAuthenticated, getSeveralAlbums)
router.get('/albums/:id/tracks', mustBeAuthenticated, getAlbumTracks)
router.get('/albums/:id/artists', mustBeAuthenticated, getAlbumArtists)
router.get('/albums/:id', mustBeAuthenticated, getAlbum)

router.get('/popular/albums', mustBeAuthenticated, getPopularAlbums)

export default router