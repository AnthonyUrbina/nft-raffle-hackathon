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
import { AddIcon, HamburgerIcon, ExternalLinkIcon, BellIcon } from '@chakra-ui/icons'
import { mainnet, goerli, optimism, polygon, polygonMumbai } from "wagmi/chains";
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

const alchemyId = 'VperEHcYqgNn_9j67hC0SlorxAtJr3aL';
const chains = [mainnet, polygon, optimism, goerli];

const client = createClient(
    getDefaultClient({
        appName: "rofl new",
        alchemyId,
        chains
    }),
)

export const NavigationBar = ({ handleConnectWallet }: NavigationBarProps) => {
    const { address, isDisconnected, isConnected } = useAccount()

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
    const { CREATE_RAFFLE } = routes
    return (
        <Flex justify="space-between" align="center" borderBottom="1px">
            <Link as={NextLink} href='/' _activeLink={{ textDecor: 'none' }} _hover={{ textDecor: 'none' }}>
                <Flex alignItems="center" px={[4, null, null, 8]} paddingY='.5rem'>
                    <Box>
                        <Image boxSize='3rem' src='/static/rofl-logo.png' alt='rofl-logo.png' />
                    </Box>
                    <Box>
                        <Text fontFamily='Syne Tactile' fontSize='1.25rem' color='#C95CC9' ml='.5rem'>ROFL</Text>
                    </Box>
                </Flex>
            </Link>
            <Flex align="center">
                <Menu>
                    <MenuList>
                        <MenuItem>Empty for now</MenuItem>
                    </MenuList>
                </Menu>
                <Hide below='md'>
                    <Box boxShadow="inset 0 0 0 2px #DFE4EC,0 2px 0 0 #DFE4EC,0px 2px 4px rgba(0,0,0,0.02);" rounded='.75rem'>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<BellIcon />}
                            />
                            <MenuList>
                                <MenuItem>
                                    You have no new notifications at this moment!
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>

                    <Link as={NextLink} href={CREATE_RAFFLE}>
                        <Button rounded='.75rem' aria-label='create raffle' p='.75rem' m='.5rem' leftIcon={<AddIcon />} boxShadow="inset 0 0 0 2px #DFE4EC,0 2px 0 0 #DFE4EC,0px 2px 4px rgba(0,0,0,0.02);">
                            Create Raffle
                        </Button>
                    </Link>
                    <Box pr={['.5rem', null, '1.5rem']} paddingY='.5rem'>
                        <WagmiConfig client={client}>
                            <ConnectKitProvider theme='rounded' mode='dark'>
                                <ConnectKitButton/>
                            </ConnectKitProvider>
                        </WagmiConfig>
                    </Box>
                </Hide>
                <Show below='md'>
                    <Flex align='center' pr={['.5rem', null, '1.5rem']} paddingY='.5rem'>
                        <Box pr={2}>
                        <WagmiConfig client={client}>
                            <ConnectKitProvider >
                                <ConnectKitButton theme='rounded' mode='dark' />
                            </ConnectKitProvider>
                        </WagmiConfig>
                    </Box>
                    <Menu>
                        <MenuButton
                                mr={['.5rem', null, '1.5rem']}
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                        />
                        <MenuList>
                                <Link href='/create-raffle'>
                                    <MenuItem icon={<AddIcon />}>
                                        Create Raffle
                                    </MenuItem>
                                </Link>
                                <Link href='/my-raffles'>
                                    <MenuItem icon={<ExternalLinkIcon />}>
                                        My Raffles
                                    </MenuItem>
                                </Link>
                                <Link href='/notifications'>
                                    <MenuItem icon={<BellIcon />}>
                                        Notifications
                                    </MenuItem>
                                </Link>
                        </MenuList>
                    </Menu>
                    </Flex>
                </Show>
            </Flex>
        </Flex>
    )

}
