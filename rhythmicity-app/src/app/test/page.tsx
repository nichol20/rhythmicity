"use client"
import { useEffect, useState } from "react"

const Child = ({ handleClick }: { handleClick: () => void }) => {
    useEffect(() => {
        const handleDocumentClick = () => {
            console.log("clicou no documento")
            handleClick()
        }
        document.addEventListener('click', handleDocumentClick)

        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    }, [handleClick])

    return <></>
}

export default function Test() {
    const [arr, setArr] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchArr = async () => {
            const newArr = await new Promise(resolve => {
                setTimeout(() => resolve(["almoçar", "exercitar", "jantar", "dormir"]), 3000)
            }) as string[]
            setArr(newArr)
            setIsLoading(false)
        }
        fetchArr()
    }, [])

    const ArrList = () => {
        if (isLoading) {
            return Array(10).fill("").map((_, i) => {
                return <li key={i}>loading...</li>
            })
        }
        return arr.map((n, i) => <li key={i}>{n}</li>)
    }

    return (
        <div>
            <ul>
                <ArrList />
            </ul>
        </div>
    )
}