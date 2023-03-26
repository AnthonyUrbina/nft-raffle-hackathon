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
import { WagmiConfig, useAccount, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import NextLink from 'next/link';
import * as routes from '../../../constants/routes';
import { useEffect, useState } from 'react';
import { NotiMenu } from '../../elements'
import { ethers } from 'ethers'
import { createSocketConnection, EVENTS } from '@pushprotocol/socket';
import * as PushAPI from "@pushprotocol/restapi";

interface NavigationBarProps {
    handleConnectWallet: (address: `0x${string}`) => void
}

const alchemyId = 'VperEHcYqgNn_9j67hC0SlorxAtJr3aL';
const chains = [goerli];

const client = createClient(
    getDefaultClient({
        appName: "rofl new",
        alchemyId,
        chains
    }),
)

interface Notification {
    title: string
    body: string
    image: string
    url: string
    cta: string
    sid: string
}

export const NavigationBar = ({ handleConnectWallet }: NavigationBarProps) => {
    const { address } = useAccount()
    console.log("NavigationBAr:address:", address)
    const [sdkSocket, setSDKSocket] = useState<any>(null)
    const [isConnected, setIsConnected] = useState(sdkSocket?.connected)
    const [notifications, setNotifications] = useState([])
    const router = useRouter()
    const { pathname } = router

    const chainId = 5
    const userCAIP = `eip155:${chainId}:${address}`;
    useEffect(() => {
        address && handleConnectWallet(address)
    }, [address, handleConnectWallet])

    useEffect(() => {
        if (address && pathname !== '/notifications') {
            const pushSDKSocket = createSocketConnection({
                user: userCAIP,
                env: 'staging',
                socketOptions: { autoConnect: false, reconnectionAttempts: 3 }
            });

            pushSDKSocket?.on(EVENTS.CONNECT, () => {
                console.log('socket connected')
                setIsConnected(true)
            })

            pushSDKSocket?.on(EVENTS.DISCONNECT, () => {
                console.log('socket disconnected')
                setIsConnected(false)
            })

            pushSDKSocket?.on(EVENTS.USER_FEEDS, notification => {

                setNotifications(notifications => {
                    console.log('preNoti', notifications)
                    const _notifications = [...notifications]
                    _notifications.push(notification)
                    console.log('post noti', _notifications)
                    return _notifications
                })
            })

            pushSDKSocket?.connect();


            setSDKSocket(pushSDKSocket);
            console.log('created pushSDKSocket', pushSDKSocket)
        }

        return () => {
            if (sdkSocket) {
                sdkSocket.disconnect()
                console.log('socket disconnected')
            }
        }
    }, [])

    useEffect(() => {
            const getNotis = async () => {
            const notifications = await PushAPI.user.getFeeds({
                user: userCAIP, // user address in CAIP
                env: 'staging'
            });
            setNotifications(notifications)
        }

        getNotis()
    },[userCAIP])



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
                                // onClick={() => ()}
                            />
                            <NotiMenu notifications={notifications}/>
                        </Menu>
                    </Box>

                    <Link as={NextLink} href={`/create/${address}`}>
                        <Button rounded='.75rem' aria-label='create raffle' p='.75rem' m='.5rem' leftIcon={<AddIcon />} boxShadow="inset 0 0 0 2px #DFE4EC,0 2px 0 0 #DFE4EC,0px 2px 4px rgba(0,0,0,0.02);">
                            Create Raffle
                        </Button>
                    </Link>
                    <Box pr={['.5rem', null, '1.5rem']} paddingY='.5rem'>
                        <ConnectKitButton />
                    </Box>
                </Hide>
                <Show below='md'>
                    <Flex align='center' pr={['.5rem', null, '1.5rem']} paddingY='.5rem'>
                        <Box pr={2}>
                            
                            <ConnectKitButton theme='rounded' mode='dark' />
                               
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
