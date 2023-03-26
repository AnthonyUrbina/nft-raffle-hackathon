import { useContext, useEffect, useState } from 'react'
import {
    Box,
    Flex,
    Text,
    Link,
    LinkBox,
    Image,
    LinkOverlay,
    Button
} from '@chakra-ui/react'
// import Image from 'next/image'
import { useRouter } from 'next/router';
import dayjs from 'dayjs'
import NextLink from 'next/link';
import * as routes from '../../../constants/routes';
import { BuyForm } from '../buyForm';
import {
    SECONDS_IN_DAY,
    SECONDS_IN_HOUR,
    SECONDS_IN_MINUTE,
} from '../../../constants'
import { ethers } from 'ethers'
import { UserContext } from '../../pages/all-raffles'

export interface RaffleCardProps {
    collection: string
    edition: string
    image: string
    altText: string
    raffleEndTime: number
    currency: string
    ticketsSold: number
    reservePrice: number
    pricePerTicket: number
    raffleId: number
    isWinner: boolean
}

export const hasTimeExpired = (raffleEndTime: number) => {
    const now = Date.now();
    return raffleEndTime * 1000 < now;
}


export const RaffleCard = ({
    collection,
    edition,
    image,
    altText,
    raffleEndTime,
    ticketsSold,
    reservePrice,
    pricePerTicket,
    currency,
    raffleId,
    isWinner
}: RaffleCardProps) => {
    const expirationDate = dayjs(raffleEndTime)
    // total seconds until launch
    let remaining = expirationDate.diff(dayjs(), 's')

    const initDays = Math.floor(remaining / SECONDS_IN_DAY)
    const initHours = Math.floor((remaining % SECONDS_IN_DAY) / SECONDS_IN_HOUR)
    const initMinutes = Math.floor((remaining % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
    const initSeconds = remaining % SECONDS_IN_MINUTE

    const [days, setDays] = useState(initDays)
    const [hours, setHours] = useState(initHours)
    const [minutes, setMinutes] = useState(initMinutes)
    const [seconds, setSeconds] = useState(remaining)

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    //             return;
    //         }

    //         let updatedSeconds = seconds - 1;
    //         let updatedMinutes = minutes;
    //         let updatedHours = hours;
    //         let updatedDays = days;

    //         if (updatedSeconds < 0) {
    //             updatedSeconds = 59;
    //             updatedMinutes -= 1;
    //         }

    //         if (updatedMinutes < 0) {
    //             updatedMinutes = 59;
    //             updatedHours -= 1;
    //         }

    //         if (updatedHours < 0) {
    //             updatedHours = 23;
    //             updatedDays -= 1;
    //         }

    //         setSeconds(updatedSeconds);
    //         setMinutes(updatedMinutes);
    //         setHours(updatedHours);
    //         setDays(updatedDays);
    //     }, 1000)

    //     return () => {
    //         clearTimeout(timeoutId)
    //     }
    // },[days, hours, minutes, seconds])

    let router = useRouter()

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = event.target as HTMLElement
        const container = target.closest('[data-id]') as HTMLElement;
        if (target.tagName !== 'BUTTON' && target.tagName !== 'INPUT') {
            if (container) {
                const { id } = container.dataset
                router.push(`/raffles/${id}`)
            }
        }
    }

    const timeCountdown = () => {
        const timeExpired = hasTimeExpired(raffleEndTime)
        if (timeExpired) {
            return (
                <>
                    <Flex flexBasis={'calc(100%/3)'} justify='center'>
                        <Text size={'12px'} fontWeight={'500'}>Expired</Text>
                    </Flex>
                </>
            )
        } else {
            return (
                <>
                    <Flex flexBasis={'calc(100%/3)'} justify='center'>
                            <Text size={'12px'} fontWeight={'500'}>{hours}H</Text>
                        </Flex>
                        <Flex flexBasis={'calc(100%/3)'} justify='center' borderX={'1px'} px={'2px'}>
                            <Text size={'12px'} fontWeight={'500'}>{minutes}M</Text>
                        </Flex>
                        <Flex flexBasis={'calc(100%/3)'} justify='center'>
                            <Text size={'12px'} fontWeight={'500'}>{seconds}S</Text>
                    </Flex>
                </>
            )
        }
    }

    const renderButton = () => {
        const timeExpired = hasTimeExpired(raffleEndTime)
        if (timeExpired) {
            if (isWinner) return <Button>Claim</Button>

        } else {
            return <BuyForm />
        }
    }

    const pricePerTicketEth = ethers.utils.formatEther(ethers.BigNumber.from(pricePerTicket.toString())); // Convert Wei to ETH

    return (
        <Flex basis={['100%', '50%', '25%']} rounded={20} border='1px' mb={[4]} mx={[2]} transition="transform 0.2s ease-in-out"
            data-id={raffleId}
            cursor={'pointer'}
            _hover={{ transform: "scale(1.02)" }}
            onClick={handleClick}
            >
            <Flex position={'relative'} flexDir={'column'} h={['94%', null, null, '30%']} w={'100%'}>
                <Flex border='1px' position={'absolute'} w={130} height={'28px'} right={'12px'} top={'12px'} justify='center' rounded={15} px={1.5}>
                    {timeCountdown()}
                </Flex >
                <Image
                    roundedTop={19}
                    src={image}
                    alt={altText}
                />
                <Flex px={[3]} py={[2]} h={['10%', '33%']} borderBottom={'1px'}>
                    <Text fontSize={['lg']} fontWeight={'500'}>{edition}</Text>
                </Flex>
                <Flex px={[3]} py={[2]} h={['10%', '33%']} justify={['space-between']}>
                    <Text fontSize={['sm']} fontWeight={'500'}>{`Tickets Sold ${ticketsSold}`}</Text>
                    <Text textAlign={'right'} fontSize={['sm']} fontWeight={'500'}>{`Ticket Price ${pricePerTicketEth} ${currency}`}</Text>
                </Flex>
                <Box px={[3]} my={1}>
                    {renderButton()}
                </Box>
            </Flex >
        </Flex>
    )
}
