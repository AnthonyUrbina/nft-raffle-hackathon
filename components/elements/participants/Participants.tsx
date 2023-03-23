import {
    Flex,
    Text,
    Image,
    ListItem,
    Button,
    Box,
    List,
    Heading,
    UnorderedList

} from '@chakra-ui/react'
import { RaffleCardProps } from '../raffleCard'

interface Details {
    yourTickets?: number
    youSpent?: number
    raffler?: `Ox${string}`
    winner?: `Ox${string}` | null
    totalRecieved?: number | null
}
// figure out if you can pull all data in RaffleCard component
// then when user clicks, pass props to here
// instead of having to pass raffle id then make another fetch

export interface ParticipantInfo {
    address: `0x${string}`
    ticketsPurchased: number
}

interface ParticipantsProps {
    participantsList: ParticipantInfo[]
}

export const Participants = ({
participantsList
}: ParticipantsProps) => {

    const participantFactory = () => {
        const participantsLi = participantsList.map(participant => {
            const {address, ticketsPurchased} = participant
                return (
                    <ListItem key={address}>
                        <Flex justify={'space-between'}>
                            <Box flexBasis={'50%'} overflow={'auto'}>
                                <Text textAlign={'left'}>{address}</Text>
                            </Box>
                            <Box flexBasis={'50%'}>
                                <Text textAlign={'right'}>{ticketsPurchased}</Text>
                            </Box>
                        </Flex>
                    </ListItem>
                )
        })

        return participantsLi
    }

    return (
        <Box border={'1px solid'} rounded={10} p={3} my={[3]}>
            <Heading size={'lg'} textAlign={'center'}>Participants</Heading>
            <Flex justifyContent={'space-between'} my={[3]}>
                <Heading size={'md'} textAlign={'left'}>Address</Heading>
                <Heading size={'md'} textAlign={'right'}>Purchased</Heading>
            </Flex>
            <UnorderedList styleType={'none'} ml={0}>
                {participantsList.length !== 0 ? participantFactory() : <Text textAlign={'center'}>There are no participants in this raffle yet.</Text>}
            </UnorderedList>
        </Box>
    )
}
