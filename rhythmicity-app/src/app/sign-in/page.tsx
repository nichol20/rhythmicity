'use client'

import { blockedEyeIcon, eyeIcon } from '@/assets'
import styles from '@/styles/SignIn.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={styles.signInPage}>
            <div className={styles.signInContainer}>
                <form className={styles.signInForm} action="">
                    <div className={styles.field}>
                        <label htmlFor="username">user</label>
                        <input
                            className={styles.fieldInput}
                            type="text"
                            name='username'
                            spellCheck={false}
                            id='username'
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password">password</label>
                        <div className={styles.passwordInputBox}>
                            <input
                                className={styles.fieldInput}
                                type={showPassword ? "text" : "password"}
                                name='password'
                                spellCheck={false}
                                id='password'
                            />
                            <button
                                className={styles.showPasswordBtn}
                                onClick={() => setShowPassword(prev => !prev)}
                                type='button'
                            >
                                <Image
                                    src={showPassword ? eyeIcon : blockedEyeIcon}
                                    alt={showPassword ? "eye" : "blocked eye"}
                                />
                            </button>
                        </div>
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