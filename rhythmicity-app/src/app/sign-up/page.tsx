'use client'

import Link from 'next/link'
import { useState } from 'react'

import { PasswordInput } from '@/components/PasswordInput'

import styles from '@/styles/SignUp.module.scss'

export default function SignUpPage() {

    return (
        <div className={styles.signUpPage}>
            <div className={styles.signUpContainer}>
                <form className={styles.signUpForm} action="">
                    <div className={styles.field}>
                        <label htmlFor="username">User</label>
                        <input
                            className={styles.fieldInput}
                            type="text"
                            name='username'
                            spellCheck={false}
                            id='username'
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
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password">password</label>
                        <PasswordInput id="password" name="password" className={styles.fieldInput} />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="confirmPassword">confirm password</label>
                        <PasswordInput id="confirmPassword" name="confirmPassword" className={styles.fieldInput} />
                    </div>
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