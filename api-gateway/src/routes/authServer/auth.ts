import express from 'express'
import { mustBeAuthenticated } from '../../middlewares/mustBeAuthenticated'
import { getUser, signIn, signOut, signUp } from '../../controllers/authServer/auth'

const router = express.Router()

router.post("/sign-in", signIn)
router.post("/sign-up", signUp)
router.get("/sign-out", mustBeAuthenticated, signOut)
router.get("/get-user", mustBeAuthenticated, getUser)

export default router