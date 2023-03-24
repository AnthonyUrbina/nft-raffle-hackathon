import {
  Box,
  Heading
} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import { FilteredViews } from "../../elements"
import { collection, getDocs } from "firebase/firestore";
import {db} from "../../../firebase"

export interface RafflePagesProps {
  pageHeading: string,
  filters: string[]
}
export const PublicRaffles = ({ pageHeading, filters }: RafflePagesProps) => {
  //replace w real data
  const raffleEndTime =  Date.now()

  const [liveRaffles, setLiveRaffles] = useState([])

  useEffect(() => {
    async function fetchCollection() {
      const querySnapshot = await getDocs(collection(db, "raffles"));
      const documents = querySnapshot.docs.map(doc => doc.data());
      const liveRaffles = documents.filter(raffle => !raffle.rafflEnded && raffle.raffleEnded !== 'true')
      console.log('liveRaffles', liveRaffles)
      setLiveRaffles(liveRaffles)
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
