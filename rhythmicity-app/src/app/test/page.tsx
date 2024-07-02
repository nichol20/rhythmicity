'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useHTTPSPrivate } from "@/hooks/useHTTPSPrivate";
import { getUser, signIn } from "@/utils/api";

export default function Test() {
    const { user, signIn, signUp } = useAuth()
    useHTTPSPrivate()

    const login = async () => {
        await signIn("test@email.com", "123")
    }

    const test = async () => {
        const res = await getUser()
    }

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={login}>Login</button>
            <button onClick={test}>check auth</button>
            <div>user: {user?.username}, email: {user?.email}</div>
        </div>
    )
}