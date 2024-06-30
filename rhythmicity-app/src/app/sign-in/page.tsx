'use client'

import Link from 'next/link'

import { PasswordInput } from '@/components/PasswordInput'

import styles from '@/styles/SignIn.module.scss'
import { useAuth } from '@/contexts/AuthContext'
import { redirect } from 'next/navigation'

export default function SignInPage() {
    const { user } = useAuth()

    if (user) {
        redirect("/")
    }

    return (
        <div className={styles.signInPage}>
            <div className={styles.signInContainer}>
                <form className={styles.signInForm} action="">
                    <div className={styles.field}>
                        <label htmlFor="email">email</label>
                        <input
                            className={styles.fieldInput}
                            type="email"
                            name='email'
                            spellCheck={false}
                            id='email'
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password">password</label>
                        <PasswordInput id='password' name='password' className={styles.fieldInput} />
                    </div>
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