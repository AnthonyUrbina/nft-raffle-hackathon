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

    const displayOptionalFields = () => {
        return (
            <>
                { totalRecieved && <Text>{`Total Recieved ${totalRecieved}`}</Text>}
                {yourTickets && <Text>{`Your Tickets ${yourTickets}`}</Text>}
                {youSpent && <Text>{`You Spent ${youSpent}`}</Text>}
                { raffler && <Text>{`Raffler ${raffler}`}</Text> }
                { winner && <Text>{`Winner ${winner}`}</Text> }
            </>
        )

    }

    return (
        <Box>
            <Text>{edition}</Text>
            <Text>{`Collection: ${collection}`}</Text>
            <Text>{`Tickets Sold: ${ticketsSold}/${totalTickets}`}</Text>
            <Text>{`Collection: ${pricePerTicket} ${currency}`}</Text>
            <Text>{`Ends in: ${raffleEndTime}`}</Text>
            {displayOptionalFields()}
        </Box>
    )
}
