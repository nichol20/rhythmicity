'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useAuth } from '@/contexts/Auth'
import { PasswordInput } from '@/components/PasswordInput'
import { ErrorMessage } from '@/components/ErrorMessage'

import styles from '@/styles/SignUp.module.scss'

export default function SignUpPage() {
    const { user, signUp } = useAuth()
    const router = useRouter()
    const [emptyFieldError, setEmptyFieldError] = useState(false)
    const [existingEmailError, setExistingEmailError] = useState(false)
    const [passwordDoesNotMatchError, setPasswordDoesNotMatchError] = useState(false)

    useEffect(() => {
        if (user) {
            router.push("/")
        }
    }, [user, router])


    const resetErrors = () => {
        setEmptyFieldError(false)
        setPasswordDoesNotMatchError(false)
        setExistingEmailError(false)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        for (const pair of formData.entries()) {
            const isFieldEmpty = (pair[1] as string).length === 0
            if (isFieldEmpty) {
                setEmptyFieldError(true)
                return
            }
        }

        const username = formData.get("username") as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get("confirmPassword") as string

        if (password !== confirmPassword) {
            return setPasswordDoesNotMatchError(true)
        }

        try {
            await signUp(username, email, password)
            router.push("/")
        } catch (error: any) {
            console.log(error)
            if (error.response?.status === 409) {
                setExistingEmailError(true)
                return
            }
        }
    }

    return (
        <div className={styles.signUpPage}>
            <div className={styles.signUpContainer}>
                <form className={styles.signUpForm} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="username">User</label>
                        <input
                            className={styles.fieldInput}
                            type="text"
                            name='username'
                            spellCheck={false}
                            id='username'
                            onChange={resetErrors}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="email">email</label>
                        <input
                            className={styles.fieldInput}
                            type="email"
                            name='email'
                            spellCheck={false}
                            id='email'
                            onChange={resetErrors}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password">password</label>
                        <PasswordInput
                            id="password"
                            name="password"
                            className={styles.fieldInput}
                            onChange={resetErrors}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="confirmPassword">confirm password</label>
                        <PasswordInput
                            id="confirmPassword"
                            name="confirmPassword"
                            className={styles.fieldInput}
                            onChange={resetErrors}
                        />
                    </div>
                    {passwordDoesNotMatchError && <ErrorMessage message='the passwords do not match' />}
                    {emptyFieldError && <ErrorMessage message='you need to fill in all the fields' />}
                    {existingEmailError && <ErrorMessage message='this email already exists' />}
                    <button type='submit' className={styles.submitBtn}>sign up</button>
                    <span className={styles.registerLinkBox}>
                        {"Already have an account? "}
                        <Link href='/sign-in' className={styles.link}>sign in</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}