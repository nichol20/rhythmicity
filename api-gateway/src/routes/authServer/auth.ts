import express from 'express'
import signIn from '../../controllers/authServer/auth/signIn'
import signUp from '../../controllers/authServer/auth/signUp'
import { mustBeAuthenticated } from '../../middlewares/mustBeAuthenticated'
import getUser from '../../controllers/authServer/auth/getUser'

const router = express.Router()

router.post("/sign-in", signIn)
router.post("/sign-up", signUp)
router.get("/get-user", mustBeAuthenticated, getUser)

export default router