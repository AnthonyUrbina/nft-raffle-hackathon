import {
  Box,
  Heading
} from '@chakra-ui/react'
import { FilteredViews } from "../../elements"

export interface RafflePagesProps {
  pageHeading: string,
  filters: string[]
}
export const PublicRaffles = ({ pageHeading, filters }: RafflePagesProps) => {
  //replace w real data
  const raffleEndTime =  Date.now()

return (
  <Box px={[4, null, null, 8]}>
    <Heading py={1}>{pageHeading}</Heading>
    <FilteredViews filters={filters} />
  </Box>
)
}
