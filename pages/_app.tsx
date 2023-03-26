import React, { useEffect, useState, createContext } from 'react'
// import '@/styles/globals.css'
// @ts-ignore
import ReactDOM from 'react-dom'
import type { AppProps } from 'next/app'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { NavigationBar } from '../components/elements'
import { ChakraProvider, ColorModeScript, Box } from '@chakra-ui/react'
import { mainnet, goerli, optimism, polygon, polygonMumbai } from "wagmi/chains";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const alchemyId = 'VperEHcYqgNn_9j67hC0SlorxAtJr3aL';
  const chains = [goerli];

  const client = createClient(
      getDefaultClient({
          appName: "rofl new",
          alchemyId,
          chains
      }),
  )

  const handleConnectWallet = (address: `0x${string}`) => {
    console.log('address', address)
    setWalletAddress(address)
  }
  // const UserContext = createContext(walletAddress)
  return (
    <>
      <ChakraProvider>
        <WagmiConfig client={client}>
          <ConnectKitProvider >
              <NavigationBar handleConnectWallet={handleConnectWallet} />
              <Box px={[4, null, null, 8]}>
                  <Component {...pageProps} />
              </Box>
          </ConnectKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </>
  )
}
