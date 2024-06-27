'use client'

import { useState } from "react"
import Image from "next/image"

import { blockedEyeIcon, eyeIcon } from "@/assets"

import styles from './style.module.scss'

interface PasswordInputProps {
    id?: string
    name?: string
    className?: string
}

export const PasswordInput = ({ id, name, className }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={`${styles.passwordInput} ${className}`}>
            <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                name={name}
                spellCheck={false}
                id={id}
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
    )
}