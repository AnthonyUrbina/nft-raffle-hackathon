import {
  Image,
  Flex,
  Heading
} from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { Details } from "../../elements/"
import { RaffleCardProps, ParticipantInfo, Participants, BuyButton } from '../../elements'
import type { DocumentData } from '@firebase/firestore-types';


interface RaffleDetailsProps {
  raffleId: string
}

export const RaffleDetails = ({ raffle }: DocumentData) => {
  //   const [participantsList, setParticipantsList] = useState<ParticipantInfo[]>([])

  //  const renderParticipants = () => {

  //  }

  console.log('raffle details raffle', raffle)

  const { image, collection, ticketsSold, raffleEndTime, pricePerTicket, totalTickets, edition, currency, altText } = raffle

  return (
    <>
      <Heading my={[1]}>Raffle Details</Heading>
      <Flex flexDir={['column', null, 'row']}>
        <Flex basis={['100%', null, '42.5%']}>
          <Image w={['100%']} height={['50vh', null, '55vh']} objectFit='cover' alt={'meebit'} src={'/static/meebit-.jpeg'} rounded={10} mb={[4]} />
        </Flex>
        <Flex flexDir={['column']} grow={1} pl={[null, null, 4]}>
          <Details
            reservePrice={.03}
            image={image}
            collection={collection}
            ticketsSold={ticketsSold}
            raffleEndTime={raffleEndTime}
            pricePerTicket={pricePerTicket}
            edition={edition}
            currency={currency}
            altText={altText}
          />
          <Participants participantsList={participantsList} />
        </Flex>
      </Flex>
    </>
  )
}
