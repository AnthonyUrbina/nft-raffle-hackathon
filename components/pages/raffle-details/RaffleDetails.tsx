import {
  Image,
  Flex,
  Heading,
  list
} from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { Details } from "../../elements/"
import { RaffleCardProps, ParticipantInfo, Participants, BuyButton } from '../../elements'
import type { DocumentData } from '@firebase/firestore-types';
import axios from 'axios';
import { RaffleDetailsContainerProps } from '../../../pages/raffles/[raffleId]';
import { Raffle } from '../../../pages/raffles/[raffleId]';
import { useAccount } from 'wagmi';

const noWinnerYet = '0x0000000000000000000000000000000000000000'

export const RaffleDetails = ({ raffle }: RaffleDetailsContainerProps) => {
  const [raffleFinal, setRaffleFinal] = useState<Raffle>()
  const { address } = useAccount()
  const { nftTokenId, nftCollectionAddress } = raffle

  useEffect(() => {
    try {
      const options = {
        method: 'GET',
        url: `https://eth-goerli.g.alchemy.com/nft/v2/YMYVZZmF7YdOUtdXKVP-OoKjlxhWa7nJ/getNFTMetadata`,
        params: {
          contractAddress: nftCollectionAddress,
          tokenId: nftTokenId,
          refreshCache: 'false'
        },
        headers: { accept: 'application/json' }
      };

      const fetchMetaData = async () => {

        const res = await axios.request(options)
        const { title, media, contractMetadata } = res.data
        const { gateway } = media[0]
        const { name } = contractMetadata

        raffle.edition = title
        raffle.image = gateway
        raffle.altText = title
        raffle.collectionName = name
        if (raffle.winner !== noWinnerYet) {
          console.log('raffle', raffle)

          raffle.isWinner = raffle.winner === address
          console.log('raffle.isWinner', raffle.isWinner)
        }

        setRaffleFinal(raffle)
      }
      fetchMetaData()
    } catch (err) {
      console.error(err)
    }
  }, [ raffle, nftCollectionAddress, nftTokenId, address])

if (!raffleFinal) return
  const { image, collectionName, raffleEndDate, reservePrice, ticketPrice, edition, altText, isWinner, owner, winner, entries } = raffleFinal
  const currency = 'ETH'
  const ticketsSold = (raffle.entries && raffle.entries.length) ?? 0

const getParticipantsList = () => {
  let participantsList = []
  for (let i = 0; i < entries.length; i++) {
    const list = []
    const container = {}
    if (container.hasOwnProperty(entries[i])) {
      container[entries[i]]++
      } else {
        container[entries[i]] = 1
      }
      for (const key in container) {
        list.push({address: key, ticketsPurchased: container[key]})
      }
      participantsList = list
    }
    return participantsList
  }

  // {address: amount}
  // loop through array
  // if address isnt in container
  // store it w value of 1
  // if it is in the container
  // incremement its value by 1
  // return the object

  return (
    <>
      <Heading my={[1]}>Raffle Details</Heading>
      <Flex flexDir={['column', null, 'row']}>
        <Flex basis={['100%', null, '42.5%']}>
          <Image w={['100%']} height={['50vh', null, '55vh']} objectFit='cover' alt={'meebit'} src={image} rounded={10} mb={[4]} />
        </Flex>
        <Flex flexDir={['column']} grow={1} pl={[null, null, 4]}>
          <Details
            raffler={owner}
            winner={winner}
            isWinner={isWinner}
            reservePrice={reservePrice}
            image={image}
            collection={collectionName}
            ticketsSold={ticketsSold}
            raffleEndTime={raffleEndDate}
            pricePerTicket={ticketPrice}
            edition={edition}
            currency={currency}
            altText={altText}
          />
          <Participants participantsList={getParticipantsList()} />
        </Flex>
      </Flex>
    </>
  )
}
