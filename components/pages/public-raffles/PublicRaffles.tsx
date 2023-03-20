import {
  Box,
  Heading
} from '@chakra-ui/react'
import { RaffleCard } from "../../elements"

interface RafflePageProps {
  pageHeading: string
}
export const PublicRaffles = ({ pageHeading }: RafflePageProps) => {
return (
  <Box>
    <Heading>{pageHeading}</Heading>
    <RaffleCard
      image='/static/supduck.png'
      collection="SupDucks"
      ticketsSold={14}
      raffleEndTime={'10/02/2052 9PM'}
      pricePerTicket={.02}
      totalTickets={24}
      edition={'SupDuck #2474'}
      altText="sup-duck"/>
  </Box>
)
}
