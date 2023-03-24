import {
  Box,
  Heading
} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import { FilteredViews } from "../../elements"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase"

export interface RafflePagesProps {
  pageHeading: string,
  filters: string[]
}


export const PublicRaffles = ({ pageHeading, filters }: RafflePagesProps) => {
  //replace w real data
  const raffleEndTime =  Date.now()

  const [liveRafflesList, setliveRafflesList] = useState([])

  const raffle = {
    entries: ['0xda9dfa130df4de4673b89022ee50ff26f6ea73cf', '0xdc24316b9ae028f1497c275eb9192a3ea0f67022'],
    erc20Address: '0x0000000000000000000000000000000000000000',
    nftCollectionAddress: '0x56c59a204f2f7c38fedbee7a6cb6940f712ea300',
    nftTokenId: '121',
    owner: '0x78c98a421da900c448b2e4aae4ac1bd8d8cb8b35',
    prizeClaimed: false,
    raffleEndDate: 1687593410,
    raffleEnded: false,
    raffleId: 19,
    reservePrice: 0,
    ticketPrice: 0,
    winner: ''
  };

  const dbRef = database().ref('raffle');

  // Write the raffle object to the database
  db.child(raffle.raffleId).set({
    entries: raffle.entries,
    erc20Address: raffle.erc20Address,
    nftCollectionAddress: raffle.nftCollectionAddress,
    nftTokenId: raffle.nftTokenId,
    owner: raffle.owner,
    prizeClaimed: raffle.prizeClaimed,
    raffleEndDate: raffle.raffleEndDate,
    raffleEnded: raffle.raffleEnded,
    reservePrice: raffle.reservePrice,
    ticketPrice: raffle.ticketPrice,
    winner: raffle.winner
  });

  useEffect(() => {
    async function fetchCollection() {
      const querySnapshot = await getDocs(collection(db, "raffles"));
      const documents = querySnapshot.docs.map(doc => doc.data());
      const liveRaffles = documents.filter(raffle => !raffle.rafflEnded && raffle.raffleEnded !== 'true')
      console.log('liveRafflesList', liveRafflesList)
      setliveRafflesList(liveRaffles)
    }

    fetchCollection();
  }, []);

return (
  <Box>
    <Heading py={1}>{pageHeading}</Heading>
    <FilteredViews filters={filters} live={liveRaffles} />
  </Box>
)
}
