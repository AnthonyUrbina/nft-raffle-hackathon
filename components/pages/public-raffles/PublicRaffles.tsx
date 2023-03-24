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

  const [raffles, setRaffles] = useState([])

  useEffect(() => {
    async function fetchCollection() {
      const querySnapshot = await getDocs(collection(db, "raffles"));
      const documents = querySnapshot.docs.map(doc => doc.data());
      setRaffles(documents)
    }

    fetchCollection();
  }, []);

return (
  <Box>
    <Heading py={1}>{pageHeading}</Heading>
    <FilteredViews filters={filters} />
  </Box>
)
}
