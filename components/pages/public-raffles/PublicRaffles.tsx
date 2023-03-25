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

export const PublicRaffles = ({ pageHeading, filters }: RafflePagesProps) => {
  const { address } = useAccount();
  // replace with real data
  const raffleEndTime = Date.now();

  const [filteredRaffles, setFilteredRaffles] = useState<FilteredRaffles>({});

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "raffles"));
        console.log("querySnapshot", querySnapshot);
        const documents = querySnapshot.docs.map(doc => doc.data());
        console.log('documents', documents);
        const liveRaffles = documents.filter(raffle => !raffle.rafflEnded && raffle.raffleEnded !== 'true');

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
            edition: 'api',
            currency: 'ETH',
            altText: '',
            image: '',
            nftCollectionAddress
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
        }

        setFilteredRaffles({ live: formattedRaffles });
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
