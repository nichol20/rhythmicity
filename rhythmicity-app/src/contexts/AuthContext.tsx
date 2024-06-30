'use client'
import { createContext, useContext, useState } from "react";

import { User } from "../types/user";
import * as api from '@/utils/api'

interface AuthContext {
    user: User | null
    signIn: (email: string, password: string) => Promise<void>,
    signUp: (username: string, email: string, password: string) => Promise<void>,
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContext)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)

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


    return (
        <AuthContext.Provider value={{ user, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}