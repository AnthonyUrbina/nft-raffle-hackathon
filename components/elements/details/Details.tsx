import {
    Flex,
    Text,
    Image,
    ListItem,
    Button,
    Box,

} from '@chakra-ui/react'
import { RaffleCardProps } from '../raffleCard'

interface Details extends RaffleCardProps {
    yourTickets: number
    youSpent: number
    raffler: `Ox${string}`
    winner: `Ox${string}` | null
    totalRecieved: number | null
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
}: RaffleCardProps) => {

    return (
        <Box>

        </Box>
    )
}
