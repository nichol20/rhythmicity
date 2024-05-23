import React, { ReactNode, useEffect, useRef } from "react"


interface ClosabeComponentProps {
    children: ReactNode
    isOpen: boolean
    close: () => void
}

export const ClosableComponent = ({ children, isOpen, close }: ClosabeComponentProps) => {
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
    }, [isOpen, close])


    if (!isOpen) return <></>

    return <div ref={elementRef}>
        {children}
    </div>
}