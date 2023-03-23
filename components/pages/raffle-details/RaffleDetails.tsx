import {
  Image,
  Flex,
  Heading
} from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { Details } from "../../elements/"
import { RaffleCardProps, ParticipantInfo, Participants, BuyButton } from '../../elements'

interface RaffleDetailsProps {
  raffleId: string
}

export const RaffleDetails = ({raffleId}: RaffleDetailsProps) => {
  const [participantsList, setParticipantsList] = useState<ParticipantInfo[]>([])
  const [raffle, setRaffle] = useState<RaffleCardProps>({
    image: '',
    collection: '',
    ticketsSold: 0,
    raffleEndTime: 0,
    pricePerTicket: 0,
    totalTickets: 0,
    edition: '',
    currency: '',
    altText: ''
  })


  useEffect(() => {
    const dummyRaffleData = {
      image: '/static/wow.png',
      collection: "World of Women",
      ticketsSold: 0,
      raffleEndTime: 1679458038,
      pricePerTicket: .02,
      totalTickets: 24,
      edition: 'WoW #8604',
      currency: 'ETH',
      altText: "wow"
    }
    setParticipantsList([{ address: '0xa0a513689935Be152F97E8e2FF93E79E7A98EF2B', ticketsPurchased: 10 }, { address: '0xa0a513689935Be152F97E8e2FF93E79E7A98EF2B', ticketsPurchased: 10 }])
    setRaffle(dummyRaffleData)
  },[])

 const renderParticipants = () => {

 }

  const { image, collection, ticketsSold, raffleEndTime, pricePerTicket, totalTickets, edition, currency, altText } = raffle

  return (
    <>
      <Heading my={[1]}>Raffle Details</Heading>
      <Flex flexDir={['column', null, 'row']}>
        <Flex basis={['100%', null, '42.5%']}>
          <Image w={['100%']} height={['50vh', null, '55vh']} objectFit='cover' alt={'meebit'} src={'/static/meebit-.jpeg'} rounded={10} mb={[4]}/>
        </Flex>
        <Flex flexDir={['column']} grow={1} pl={4}>
          <Details
            image={image}
            collection={collection}
            ticketsSold={ticketsSold}
            raffleEndTime={raffleEndTime}
            pricePerTicket={pricePerTicket}
            totalTickets={totalTickets}
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
