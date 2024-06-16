import Joi from 'joi'

interface SignUp {
    username: string
    email: string
    password: string
}

export const signUpSchema = Joi.object<SignUp>({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

interface SignIn {
    email: string
    password: string
}

export const signInSchema = Joi.object<SignIn>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})