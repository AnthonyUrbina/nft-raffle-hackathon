import React, { useEffect } from 'react'
// import '@/styles/globals.css'
// @ts-ignore
import ReactDOM from 'react-dom'
import type { AppProps } from 'next/app'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { NavigationBar } from '../components/elements'



import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <ChakraProvider>
      <NavigationBar />
    </ChakraProvider>
  )
}
