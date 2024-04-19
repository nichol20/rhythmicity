import { useEffect, useState } from 'react'

export const useDebounce = <T extends any>(value: T, delay = 500, cb?: (value: T) => void) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
            if (cb) cb(value)
        }, delay)

        return () => clearTimeout(timeout)
    }, [value, delay, cb])

    return debouncedValue
}
