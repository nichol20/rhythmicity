import express from 'express'
import signIn from '../../controllers/authServer/auth/signIn'
import signUp from '../../controllers/authServer/auth/signUp'

const router = express.Router()

router.post("/sign-in", signIn)
router.post("/sign-up", signUp)

export default router