import express from 'express'
import signIn from '../../controllers/authServer/auth/signIn'
import signUp from '../../controllers/authServer/auth/signUp'
import { mustBeAuthenticated } from '../../middlewares/mustBeAuthenticated'

const router = express.Router()

router.post("/sign-in", signIn)
router.post("/sign-up", signUp)
router.get("/auth-check", mustBeAuthenticated, (req, res) => {
    return res.status(200).send("authenticated")
})

export default router