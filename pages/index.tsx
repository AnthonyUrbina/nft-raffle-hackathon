import { memo } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

const HomeContainer = () => {
  return (
    <>
      <Head>
        <title>Raffle 3.0</title>
        <meta name="description" content="NFT Raffle app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/rofl-logo.png" />
      </Head>
    </>
  )
}

HomeContainer.displayName = 'Home Container'

export default memo(HomeContainer)
