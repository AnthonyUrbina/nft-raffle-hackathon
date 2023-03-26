import {
    Heading
} from '@chakra-ui/react'
import { CreateRaffleForm } from '../../elements'

import { CreateRaffleContainerProps } from '../../../pages/create/[user]'
import { useEffect, useState } from 'react'
import * as PushAPI from "@pushprotocol/restapi";
import { useAccount } from 'wagmi';
import { NotiLi } from '../../elements';


export const Notifications = () => {
    const { address } = useAccount()
    const [notifications, setNotifications] = useState([])
    const chainId = 5
    const userCAIP = `eip155:${chainId}:${address}`;

    useEffect(() => {
        const getNotis = async () => {
            const notifications = await PushAPI.user.getFeeds({
                user: userCAIP, // user address in CAIP
                env: 'staging'
            });
            setNotifications(notifications)
        }

        getNotis()
    }, [])

    return (
        <>
            <Heading py={1} fontFamily='Inter' as='h3' fontWeight='semibold'>
                Notifications
            </Heading>
            <NotiLi notifications={notifications} />
        </>
    )
}
