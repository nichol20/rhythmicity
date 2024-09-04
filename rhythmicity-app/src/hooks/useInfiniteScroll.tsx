import { DependencyList, useEffect, useRef } from "react"

type UseInfiniteScrolling = (
    onReachBottom: () => (() => void) | void,
    delay: number
) => void

export const useInfiniteScrolling: UseInfiniteScrolling = (
    onReachBottom,
    delay = 0
) => {
    const isThrottled = useRef(false)

    useEffect(() => {
        const handleScroll = () => {
            if (isThrottled.current) return
            // The scrollTop property sets or returns the number of pixels an element's content is scrolled vertically
            const scrollTop = Math.ceil(document.documentElement.scrollTop)
            const windowHeight = window.innerHeight
            // The scrollHeight returns the height of an element
            const scrollHeight = document.documentElement.scrollHeight

            if (scrollTop + windowHeight === scrollHeight) {
                onReachBottom()
                isThrottled.current = true
                setTimeout(() => {
                    isThrottled.current = false
                }, delay)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [onReachBottom, delay])
}