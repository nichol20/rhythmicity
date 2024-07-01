'use client';

import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/types/user";
import { signIn } from "@/utils/api";
import { https } from "@/utils/http";
import { useState } from "react";

export default function Test() {
    const { user, signIn, signUp } = useAuth()

    const login = async () => {
        await signIn("test@email.com", "123")
    }

    const test = async () => {
        const res = await https.get("/auth-check")
        alert(res.data)
    }

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={login}>Login</button>
            <button onClick={test}>check auth</button>
            <div>user: {user?.username}, email: {user?.email}</div>
        </div>
    )
}