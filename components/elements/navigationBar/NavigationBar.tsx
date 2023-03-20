import {
    Box,
    Flex,
    Link,
    Button,
    Image,
    HStack,
    LinkBox,
    LinkOverlay,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    Show,
    Hide
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router';
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import NextLink from 'next/link';
import * as routes from '../../../constants/routes';
import { useAccount } from "wagmi";
import { useEffect } from 'react';

interface NavigationBarProps {
    handleConnectWallet: (address: `0x${string}`) => void
}

const alchemyId = 'EoOTjHvOIujYqlStV6ppG71Y7Cf94wRj';

const client = createClient(
    getDefaultClient({
        appName: "ROFL",
        alchemyId,
    }),
)

export const NavigationBar = ({ handleConnectWallet }: NavigationBarProps) => {
    const { address, isDisconnected, isConnected } = useAccount()
    console.log('user is connected', typeof address)

    useEffect(() => {
        if (!address) return
        handleConnectWallet(address)
    },[address, handleConnectWallet])

    // const passHref = () => {
    //     if (address) {
    //         const _address = address.toString()
    //         const href = {{ pathname: '/home', query: address }}
    //     }
    // }

    const router = useRouter()
    console.log(routes.CREATE_RAFFLE)
    const { CREATE_RAFFLE } = routes
    return (
        <Flex justify="space-between" align="center" borderBottom="1px">
            <Link as={NextLink} href='/' _activeLink={{ textDecor: 'none' }} _hover={{ textDecor: 'none' }}>
                <Flex alignItems="center" paddingX={['.5rem', null, '1.5rem']} paddingY='.5rem'>
                    <Box>
                        <Image boxSize='3rem' src='/static/rofl-logo.png' alt='rofl-logo.png' />
                    </Box>
                    <Box>
                        <Text fontFamily='Syne Tactile' fontSize='1.25rem' color='#C95CC9' ml='.5rem'>ROFL</Text>
                    </Box>
                </Flex>
            </Link>
            <Flex>
                <Hide below='md'>
                    <Link as={NextLink} href={CREATE_RAFFLE}>
                        <Button rounded='.75rem' aria-label='create raffle' p='.75rem' m='.5rem' leftIcon={<AddIcon />} boxShadow="inset 0 0 0 2px #DFE4EC,0 2px 0 0 #DFE4EC,0px 2px 4px rgba(0,0,0,0.02);">
                            Create Raffle
                        </Button>
                    </Link>
                </Hide>
                <Show below='md'>
                    <Link as={NextLink} href={CREATE_RAFFLE}>
                        <IconButton aria-label='create raffle' p='1.25rem' m='.5rem' boxSize={5} icon={<AddIcon />} boxShadow="inset 0 0 0 2px #DFE4EC,0 2px 0 0 #DFE4EC,0px 2px 4px rgba(0,0,0,0.02);" />
                    </Link>
                </Show>
                <Box paddingRight={['.5rem', null, '1.5rem']} paddingY='.5rem'>
                    <WagmiConfig client={client}>
                        <ConnectKitProvider theme='rounded'>
                            <ConnectKitButton />
                        </ConnectKitProvider>
                    </WagmiConfig>
                </Box>
            </Flex>
        </Flex>
    )

}
