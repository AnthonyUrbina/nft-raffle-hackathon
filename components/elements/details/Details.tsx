import {
    Flex,
    Text,
    Image,
    ListItem,
    Button,
    Box,

} from '@chakra-ui/react'
import { RaffleCardProps } from '../raffleCard'
import { BuyButton, QuantityButton, BuyForm } from '../../elements'

interface Details extends RaffleCardProps {
    yourTickets?: number
    youSpent?: number
    raffler?: `Ox${string}`
    winner?: `Ox${string}` | null
    totalRecieved?: number | null
}
// figure out if you can pull all data in RaffleCard component
// then when user clicks, pass props to here
// instead of having to pass raffle id then make another fetch

export const Details = ({
    edition,
    collection,
    image,
    altText,
    raffleEndTime,
    ticketsSold,
    totalTickets,
    pricePerTicket,
    currency,
    yourTickets,
    youSpent,
    raffler,
    winner,
    totalRecieved
}: Details) => {

    return (
        <Box border={'1px solid'} rounded={10} p={3}>
            <Text fontSize={['xl', null, '2xl']} fontWeight={'medium'}>{edition}</Text>
            <Text fontSize={['lg', null, 'xl']} fontWeight={'medium'}>{`Collection: ${collection}`}</Text>
            <Text fontSize={['lg', null, 'xl']} fontWeight={'medium'}>{`Tickets Sold: ${ticketsSold}/${totalTickets}`}</Text>
            <Text fontSize={['lg', null, 'xl']} fontWeight={'medium'}>{`Collection: ${pricePerTicket} ${currency}`}</Text>
            <Text fontSize={['lg', null, 'xl']} fontWeight={'medium'}>{`Ends in: ${raffleEndTime}`}</Text>
            {totalRecieved && <Text fontSize={['lg', null, 'xl']} fontWeight={'medium'}>{`Total Recieved ${totalRecieved}`}</Text>}
            {yourTickets && <Text fontSize={['lg', null, 'xl']} fontWeight={'medium'}>{`Your Tickets ${yourTickets}`}</Text>}
            {youSpent && <Text fontSize={['lg', null, 'xl']} fontWeight={'medium'}>{`You Spent ${youSpent}`}</Text>}
            {raffler && <Text fontSize={['lg', null, 'xl']} fontWeight={'medium'}>{`Raffler ${raffler}`}</Text>}
            {winner && <Text fontSize={['lg', null, 'xl']} fontWeight={'medium'}>{`Winner ${winner}`}</Text>}
            <Box textAlign={'center'} my={1}>
                {!winner && <> <BuyForm /> </> }
            </Box>
        </Box>
    )
}
