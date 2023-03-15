import { useState } from 'react'
import {
    Box,
    Flex,
    Text,
    Link,
    LinkBox,
    Image,
    LinkOverlay,
} from '@chakra-ui/react'
// import Image from 'next/image'
import { useRouter } from 'next/router';
import dayjs from 'dayjs'
import NextLink from 'next/link';
import * as routes from '../../../constants/routes';
import {
    SECONDS_IN_DAY,
    SECONDS_IN_HOUR,
    SECONDS_IN_MINUTE,
} from '../../../constants'

export interface RaffleCardProps {
    collection: string
    edition: string
    image: string
    altText: string
    raffleEndTime: string
    ticketsSold: number
    totalTickets: number
    pricePerTicket: number
}

export const RaffleCard = ({
    collection,
    edition,
    image,
    altText,
    raffleEndTime,
    ticketsSold,
    totalTickets,
    pricePerTicket,
}: RaffleCardProps) => {
    const expirationDate = dayjs(raffleEndTime)
    // total seconds until launch
    let remaining = expirationDate.diff(dayjs(), 's')

    // days
    const initDays = Math.floor(remaining / SECONDS_IN_DAY)
    remaining = remaining % SECONDS_IN_DAY

    // hours
    const initHours = Math.floor(remaining / SECONDS_IN_HOUR)
    remaining = remaining % SECONDS_IN_HOUR

    // minutes
    const initMinutes = Math.floor(remaining / SECONDS_IN_MINUTE)
    remaining = remaining % SECONDS_IN_MINUTE

    const [days, setDays] = useState(initDays)
    const [hours, setHours] = useState(initHours)
    const [minutes, setMinutes] = useState(initMinutes)
    const [seconds, setSeconds] = useState(remaining)

    setTimeout(() => {
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            return
        }

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 1) {
            setSeconds(seconds - 1)
            return
        }

        if (hours === 0 && minutes === 0 && seconds === 1) {
            setSeconds(seconds - 1)
            setMinutes(59)
            setHours(23)
            setDays(days - 1)
            return
        }

        if (minutes === 0 && seconds === 1) {
            setSeconds(seconds - 1)
            setMinutes(59)
            setHours(hours - 1)
            return
        }

        if (seconds === 1) {
            setSeconds(seconds - 1)
            setMinutes(minutes - 1)
            return
        }

        if (seconds === 0) {
            setSeconds(59)
            return
        }

        setSeconds(seconds - 1)
    }, 1000)

    return (
        <NextLink href={routes.RAFFLE_DETAILS} passHref>
            <Flex
                position={'relative'}
                flexDir={'column'}
                h={['94%', null, null, '30%']}
            >
                <Flex
                    position={'absolute'}
                    flexDir={'row'}
                    width={'98px'}
                    height={'28px'}
                    right={'12px'}
                    top={'12px'}
                >
                    <Flex w={'33%'}>
                        <Text size={'12px'} fontWeight={'500'}>{hours}H</Text>
                    </Flex>
                    <Flex w={'34%'}>
                        <Text size={'12px'} fontWeight={'500'}>{minutes}M</Text>
                    </Flex>
                    <Flex w={'33%'}>
                        <Text size={'12px'} fontWeight={'500'}>{seconds}S</Text>
                    </Flex>
                </Flex >
                <Image
                    src={image}
                    alt={altText}
                    h={['80 %']}
                />
                <Flex pl={'12px'} h={['10%']}>
                    <Text size={'16px'} fontWeight={'500'}>{collection}{' '}#{edition}</Text>
                </Flex>
                <Flex pl={'12px'} h={['10%']}>
                    <Text size={'12px'} fontWeight={'500'}>Tickets Sold:{' '}{ticketsSold}/{totalTickets}</Text>
                    <Text size={'12px'} fontWeight={'500'}>Ticket Price:{' '}{pricePerTicket}</Text>
                </Flex>
            </Flex >
        </NextLink>
    )
}