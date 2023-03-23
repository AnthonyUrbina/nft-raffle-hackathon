import {
    Flex,
    Text,
    Image,
    ListItem,
    Button,
    Box,
    List,
    Heading,
    HStack,
    Input,
    UnorderedList

} from '@chakra-ui/react'
import { useNumberInput } from '@chakra-ui/react'

// figure out if you can pull all data in RaffleCard component
// then when user clicks, pass props to here
// instead of having to pass raffle id then make another fetch

export const QuantityButton = () => {

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 3,
            min: 0,
            max: 100,
            precision: 0,
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
        <HStack maxW='170px'>
            <Button background={'transparent'} {...inc}>+</Button>
            <Input textAlign={'center'} rounded={20} {...input} />
            <Button background={'transparent'} {...dec}>-</Button>
        </HStack>
    )
}
