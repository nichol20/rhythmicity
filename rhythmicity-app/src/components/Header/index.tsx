'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from './style.module.scss'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { logo } from '@/assets'

export const Header = () => {
  const pathname = usePathname()
  const [scrollPos, setScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const getLinkClass = (path: string): string => {
    return pathname === path ? styles.active : ''
  }

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttonEl = event.currentTarget

    buttonEl.classList.toggle(styles.active)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      setVisible(scrollPos > currentScrollPos || currentScrollPos < 10)
      setScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollPos])

  return (
    <div className={`${styles.header} ${visible ? '' : styles.hidden}`}>
      <div className={styles.content}>
        <button className={styles.toggleMenu} onClick={toggleMenu}></button>
        <Link href='/' className={styles.logo}>
          <Image src={logo} alt='logo' width={30} height={30}/>
          Rhythmicity
        </Link>
        <div className={styles.linkList}>
          <Link href="/home" className={getLinkClass('/')}>home</Link>
          <Link href="/collection" className={getLinkClass('/collection')}>collection</Link>
        </div>
      </div>
    </div>
  )
}