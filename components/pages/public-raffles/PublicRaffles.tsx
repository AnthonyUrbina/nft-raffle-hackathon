import {
  Box,
  Heading
} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import { FilteredViews } from "../../elements"
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../firebase"
import type { DocumentData } from '@firebase/firestore-types';
import { RaffleCardProps } from '../../elements';

export interface RafflePagesProps {
  pageHeading: string,
  filters: string[]
}

export interface FirebaseRaffle {
  entries: string[];
  erc20Address: string;
  nftCollectionAddress: string;
  nftTokenId: string;
  owner: string;
  prizeClaimed: boolean;
  raffleEndDate: number;
  raffleEnded: boolean;
  raffleId: number;
  reservePrice: number;
  ticketPrice: number;
  winner: string;
}

export interface FilteredRaffles {
  [key: string]: RaffleCardProps[]
}


export const PublicRaffles = ({ pageHeading, filters }: RafflePagesProps) => {
  //replace w real data
  const raffleEndTime = Date.now()

  const [filteredRaffles, setFilteredRaffles] = useState<FilteredRaffles>({})

  useEffect(() => {
    console.log('hello 323')
    const fetchCollection = async () => {
      const querySnapshot = await getDocs(collection(db, "raffles"));
      const documents = querySnapshot.docs.map(doc => doc.data());
      const liveRaffles = documents.filter(raffle => !raffle.rafflEnded && raffle.raffleEnded !== 'true')
      console.log('live raffles', liveRaffles)
      console.log('documents', documents)
      const formattedRaffles = documents.map((doc: DocumentData) => {
        const { entries, erc20Address, nftCollectionAddress, nftTokenId, owner, prizeClaimed, raffleEndDate, raffleEnded, raffleId, reservePrice, ticketPrice, winner } = doc;
        return {
          ticketsSold: entries.length,
          erc20Address,
          collection: 'api',
          nftTokenId,
          prizeClaimed,
          raffleEndTime: raffleEndDate,
          raffleId,
          reservePrice,
          pricePerTicket: ticketPrice,
          edition: 'api',
          currency: 'hardcode',
          altText: 'api',
          image: 'public/static/supsuck.png'
        }
      });
      setFilteredRaffles({ live: formattedRaffles })
    }
    fetchCollection();
  },[] )

  return (
    <Box>
      <Heading py={1}>{pageHeading}</Heading>
      <FilteredViews filters={filters} filteredRaffles={filteredRaffles} />
    </Box>
  )
}
