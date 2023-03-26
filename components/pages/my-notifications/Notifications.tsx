import {
    Heading,
    Flex,
    Stack,
    Switch
} from '@chakra-ui/react'
import { CreateRaffleForm } from '../../elements'
import { CreateRaffleContainerProps } from '../../../pages/create-raffle'
import { useEffect, useState } from 'react'
import * as PushAPI from "@pushprotocol/restapi";
import { useAccount, useSigner } from 'wagmi';
import { NotiLi } from '../../elements';
import { createSocketConnection, EVENTS } from '@pushprotocol/socket';
import { subscribe } from '@pushprotocol/restapi/src/lib/channels';

export const Notifications = () => {
    const { address } = useAccount()
    // const { data: signer, isError, isLoading } = useSigner()
    const [sdkSocket, setSDKSocket] = useState<any>(null)
    const [newNotification, setNewNotification] = useState()
    const [isConnected, setIsConnected] = useState()
    const [value, setValue] = useState(true)

    const [notifications, setNotifications] = useState([])
    const chainId = 5
    const userCAIP = `eip155:${chainId}:${address}`;
    console.log('/my-notifications/Notifications.tsx , notifications:', notifications)
    console.log('/my-notifications/Notifications.tsx , newNotification:', newNotification)

    useEffect(() => {
        if (address) {
            const dev = true
            if (dev) {
                const getNotis = async () => {
                    const notificationsSpam = await PushAPI.user.getFeeds({
                        user: userCAIP,
                        spam: true,
                        env: 'staging'
                    });
                    setNotifications(notificationsSpam)
                }
                getNotis()
            } else {
                const getNotis = async () => {
                   const notifications = await PushAPI.user.getFeeds({
                       user: userCAIP,
                       env: 'staging'
                   });
                   setNotifications(notifications)
                }
                getNotis()
            }
        }

    }, [])

    useEffect(() => {
        if (address) {
            const pushSDKSocket = createSocketConnection({
                user: userCAIP,
                env: 'staging',
                socketOptions: { autoConnect: false, reconnectionAttempts: 3 }
            });

            pushSDKSocket?.on(EVENTS.CONNECT, () => {
                console.log('socket connected')
            })

            pushSDKSocket?.on(EVENTS.DISCONNECT, () => {
                console.log('socket disconnected')
            })

            pushSDKSocket?.on(EVENTS.USER_FEEDS, notification => {
                console.log('event socket noti', notification)
                const { payload } = notification
                const { data } = payload
                const { acta, aimg, amsg, asub, sid } = data
                const filteredNotification = {
                    cta: acta,
                    image: aimg,
                    message: amsg,
                    title: asub,
                    sid
                }

                setNotifications(notifications => {
                    console.log('preNoti', notification)
                    const _notifications = [...notifications]
                    _notifications.push(filteredNotification)
                    console.log('post noti', _notifications)
                    return _notifications
                })
                // setNewNotification(notification)
            })
            pushSDKSocket?.connect();


            setSDKSocket(pushSDKSocket);
            // setNewNotification(notification)
            console.log('created pushSDKSocket', pushSDKSocket)
        }
    }, [])

    const subscribeUser = async (signer) => {
            await PushAPI.channels.subscribe({
                signer,
                channelAddress: 'eip155:5:0x07c233C36ac7103bDDD8fdebE9935fE871BF5474',
                userAddress: userCAIP,
                onSuccess: () => {
                    console.log('opt in success');
                },
                onError: () => {
                    console.error('opt in error');
                },
                env: 'staging'
            })
    }

    const clearNotifications = (value) => {
        if (value) setNotifications([])
        if (!value && notifications.length === 0) {
            console.log('hi')
            const getNotis = async () => {
                const notificationsSpam = await PushAPI.user.getFeeds({
                    user: userCAIP,
                    spam: true,
                    env: 'staging'
                });
                setNotifications(notificationsSpam)
            }
            getNotis()
        }
        setValue(!value)
    }

    return (
        <>
        <Flex align={'center'}>
                <Heading py={1} pr={3} fontFamily='Inter' as='h3' fontWeight='semibold'>
                    Notifications
                </Heading>
                <Stack direction='row'>
                    <Switch size='lg' colorScheme={'whatsapp'} isChecked={value} onChange={() => clearNotifications(value)}/>
                </Stack>
        </Flex>
            <NotiLi notifications={notifications} />
        </>
    )
}
