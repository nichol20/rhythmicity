'use client'
import { createContext, useContext, useEffect, useState } from "react";

import { User } from "../types/user";
import * as api from '@/utils/api'
import { https } from "@/utils/http";

interface AuthContext {
    user: User | null
    signIn: (email: string, password: string) => Promise<void>
    signUp: (username: string, email: string, password: string) => Promise<void>
    signOut: () => void
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContext)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const signIn = async (email: string, password: string) => {
        const user = await api.signIn(email, password)
        setUser(user)
    }

    const signUp = async (username: string, email: string, password: string) => {
        const user = await api.signUp({
            email,
            username,
            password
        })
        setUser(user)
    }

    const signOut = () => {
        setUser(null)
        api.signOut()
    }

    useEffect(() => {
        const refreshUser = async () => {
            try {
                const user = await api.getUser()
                setUser(user)
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setIsLoading(false)
            }
        }

        refreshUser()
    }, [])

    useEffect(() => {
        const responseIntercept = https.interceptors.response.use(
            response => response,
            async error => {
                console.error(error)
                if (error?.response?.status === 403 || error?.response?.status === 401) {
                    window.location.assign("/sign-in")
                }
                return Promise.reject(error)
            }
        )

        return () => {
            https.interceptors.response.eject(responseIntercept)
        }
    }, [])

    if (isLoading) return <>Loading...</>

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}