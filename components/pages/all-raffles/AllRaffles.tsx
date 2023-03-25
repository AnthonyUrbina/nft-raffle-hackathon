import {
  Box,
  filter,
  Heading,
  useCallbackRef
} from '@chakra-ui/react'
import { useState, useEffect, useCallback } from 'react'
import { FilteredViews } from "../../elements"
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../firebase"
import type { DocumentData } from '@firebase/firestore-types';
import { RaffleCardProps } from '../../elements';
import { Alchemy, Network } from "alchemy-sdk";
import { useAccount } from 'wagmi';
import axios from 'axios';
import { Raffle } from '../../../pages/raffles/[raffleId]';

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

export interface AlmostThere extends RaffleCardProps {
  nftTokenId?: string
  nftCollectionAddress: string
}

export interface FilteredRaffles {
  [key: string]: AlmostThere[]
}


const config = {
  apiKey: 'YMYVZZmF7YdOUtdXKVPOoKjlxhWa7nJ',
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

export const AllRaffles = ({ pageHeading, filters }: RafflePagesProps) => {
  const { address } = useAccount();

  const [filteredRaffles, setFilteredRaffles] = useState<FilteredRaffles>({});
  const noWinnerYet = '0x0000000000000000000000000000000000000000'

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "raffles"));
        console.log("querySnapshot", querySnapshot);
        const documents = querySnapshot.docs.map(doc => doc.data());
        console.log('documents', documents);
        const formattedRaffles = documents.map((doc: DocumentData) => {
          const { entries, erc20Address, nftCollectionAddress, nftTokenId, owner, prizeClaimed, raffleEndDate, raffleEnded, raffleId, reservePrice, ticketPrice, winner } = doc;
          return {
            ticketsSold: entries.length,
            erc20Address,
            collection: '',
            nftTokenId,
            prizeClaimed,
            raffleEndTime: raffleEndDate,
            raffleId,
            reservePrice,
            pricePerTicket: ticketPrice,
            edition: '',
            currency: 'ETH',
            altText: '',
            image: '',
            nftCollectionAddress,
            winner,
            raffleEnded,
            owner
          }
        });

        for (let i = 0; i < formattedRaffles.length; i++) {
          const { nftTokenId, nftCollectionAddress } = formattedRaffles[i];

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

          const res = await axios.request(options);
          const { title, media } = res.data;
          const { gateway } = media[0];

          formattedRaffles[i].edition = title;
          formattedRaffles[i].image = gateway;
          formattedRaffles[i].altText = title;

          const liveRaffles = formattedRaffles.filter(raffle => !raffle.raffleEnded && raffle.winner === noWinnerYet && !raffle.prizeClaimed);
          console.log('live raffles', liveRaffles)
          const expiredRaffles = formattedRaffles.filter(raffle => raffle.winner !== noWinnerYet || raffle.raffleEnded || raffle.prizeClaimed)
          console.log('expiredRaffles', expiredRaffles)
          setFilteredRaffles({ live: liveRaffles, expired: expiredRaffles });
        }

      } catch (err) {
        console.error(err);
      }
    };

    fetchCollection();
  }, []);

  return (
    <Box>
      <Heading py={1}>{pageHeading}</Heading>
      <FilteredViews filters={filters} filteredRaffles={filteredRaffles} />
    </Box>
  )
}
