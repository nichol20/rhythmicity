'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { useAuth } from '@/contexts/AuthContext'
import { logo, searchIcon } from '@/assets'

import styles from './style.module.scss'

export const Header = () => {
  const { user } = useAuth()
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
    <header className={`${styles.header} ${visible ? '' : styles.hidden}`}>
      <div className={styles.content}>
        <button className={styles.toggleMenu} onClick={toggleMenu}></button>
        <Link href='/' className={styles.logo}>
          <Image src={logo} alt='logo' width={30} height={30} />
          Rhythmicity
        </Link>
        <div className={styles.linkList}>
          <Link href="/" className={getLinkClass('/')}>home</Link>
          {user && (
            <>
              <Link href="/collection" className={getLinkClass('/collection')}>collection</Link>
              <Link href="/search" className={styles.search}>
                search
                <Image src={searchIcon} alt="search" className={styles.icon} />
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link href="/sign-in">sign in</Link>
              <Link href="/sign-up">sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}