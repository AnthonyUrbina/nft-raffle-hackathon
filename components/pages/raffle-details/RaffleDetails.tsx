import {
  Image
} from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { Details } from "../../elements/"
import { RaffleCardProps } from '../../elements'

interface RaffleDetailsProps {
  raffleId: string
}

export const RaffleDetails = ({raffleId}: RaffleDetailsProps) => {
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

    setRaffle(dummyRaffleData)
  },[])

  const { image, collection, ticketsSold, raffleEndTime, pricePerTicket, totalTickets, edition, currency, altText } = raffle

  return (
    <>
      <Image w={['100%']} height={['50vh']} objectFit='cover' alt={'meebit'} src={'/static/meebit-.jpeg'} rounded={10} mb={[4]}/>
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
    </>
  )
}
