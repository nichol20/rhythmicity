import React, { ReactNode, useEffect, useRef } from "react"

interface ClosabeComponentProps {
    children: ReactNode
    isOpen: boolean
    close: () => void
    className?: string
}

export const ClosableComponent = ({ children, isOpen, close, className }: ClosabeComponentProps) => {
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (elementRef.current && !elementRef.current.contains((event.target as HTMLElement))) {
                close()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [close])


    if (!isOpen) return <></>

    return <div ref={elementRef} className={className}>
        {children}
    </div>
}