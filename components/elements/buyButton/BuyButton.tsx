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

// figure out if you can pull all data in RaffleCard component
// then when user clicks, pass props to here
// instead of having to pass raffle id then make another fetch

export const BuyButton = () => {

    return (
        <Button w={['100%']} rounded={20}>
            Buy 3 Tickets Now
        </Button>
    )
}
