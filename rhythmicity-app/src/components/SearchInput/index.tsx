import React, { useCallback, useEffect, useState } from "react";

import styles from './style.module.scss'
import Image from "next/image";
import { closeIcon, searchIcon } from "@/assets";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchInputProps {
    onChange: (value: string) => void
    defaultValue?: string | undefined
    delay: number
}

export const SearchInput = function SearchInput({ onChange, defaultValue = "", delay = 0 }: SearchInputProps) {
    const [value, setValue] = useState(defaultValue)
    const [isEmpty, setIsEmpty] = useState(true)


    const handleChange = (query: string) => {
        setValue(query)
        setIsEmpty(query === "")
    }

    const cleanValue = () => {
        setValue("")
        setIsEmpty(true)
    }

    useDebounce(value, delay, onChange)

    return (
        <div className={styles.container}>
            <input
                type="text"
                onChange={e => handleChange(e.target.value)}
                value={value}
                placeholder="What do you want to listen?"
                className={styles.searchInput}
            />
            {!isEmpty && (
                <button className={styles.cleanBtn} onClick={cleanValue}>
                    <Image src={closeIcon} alt="clean" className={styles.icon} />
                </button>
            )}
            <Image src={searchIcon} alt="search" className={styles.icon} />
        </div>
    )
}