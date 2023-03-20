import {
  Box,
  Heading
} from '@chakra-ui/react'
import { RaffleCard } from "../../elements"

interface RafflePageProps {
  pageHeading: string
}
export const PublicRaffles = ({ pageHeading }: RafflePageProps) => {
  //replace w real data
  const raffleEndTime =  Date.now()
return (
  <Box px={[4, null, null, 8]}>
    <Heading py={1}>{pageHeading}</Heading>
    <RaffleCard
      image='/static/supduck.png'
      collection="SupDucks"
      ticketsSold={14}
      raffleEndTime={raffleEndTime}
      pricePerTicket={.02}
      totalTickets={24}
      edition={'SupDuck #7292'}
      currency={'ETH'}
      altText="sup-duck"/>
  </Box>
)
}
