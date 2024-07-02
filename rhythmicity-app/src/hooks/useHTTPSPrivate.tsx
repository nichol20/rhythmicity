import { https } from "@/utils/http"
import { useEffect } from "react"

export const useHTTPSPrivate = () => {
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
}