'use client'

import { useState } from "react"
import Image from "next/image"

import { blockedEyeIcon, eyeIcon } from "@/assets"

import styles from './style.module.scss'

interface PasswordInputProps {
    id?: string
    name?: string
    className?: string
    onChange?: () => void
}

export const PasswordInput = ({ id, name, className, onChange }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={`${styles.passwordInput} ${className}`}>
            <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                name={name}
                spellCheck={false}
                id={id}
                onChange={onChange}
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