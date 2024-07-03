'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { PasswordInput } from '@/components/PasswordInput'
import { useAuth } from '@/contexts/AuthContext'

import styles from '@/styles/SignIn.module.scss'
import { ErrorMessage } from '@/components/ErrorMessage'

export default function SignInPage() {
    const { user, signIn } = useAuth()
    const [emptyFieldError, setEmptyFieldError] = useState(false)
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    const router = useRouter()

    const resetErrors = () => {
        setEmptyFieldError(false)
        setInvalidCredentials(false)
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

        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            await signIn(email, password)
            router.push("/")
        } catch (error: any) {
            console.log(error)
            if (error.response?.status === 400) {
                setInvalidCredentials(true)
                return
            }
        }
    }

    if (user) {
        redirect("/")
    }

    return (
        <div className={styles.signInPage}>
            <div className={styles.signInContainer}>
                <form className={styles.signInForm} onSubmit={handleSubmit}>
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
                        <PasswordInput id='password' name='password' className={styles.fieldInput} onChange={resetErrors} />
                    </div>
                    {invalidCredentials && <ErrorMessage message='invalid email or password' />}
                    {emptyFieldError && <ErrorMessage message='you need to fill in all the fields' />}
                    <button type='submit' className={styles.submitBtn}>sign in</button>
                    <span className={styles.registerLinkBox}>
                        {"Don't have an account? "}
                        <Link href='/sign-up' className={styles.link}>sign up</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}