import {
    Flex,
    Text,
    Image,
    ListItem,
    Button,
    Box,

} from '@chakra-ui/react'
import { RaffleCardProps } from '../raffleCard'
import { BuyButton, QuantityButton } from '..'

export const BuyForm = () => {

    return (
        <Flex rounded={10} py={2} justifyContent={['space-between']}>
            <Flex basis={['40%']}>
                <QuantityButton />
            </Flex>
            <Flex basis={['60%']}>
                <BuyButton />
            </Flex>
        </Flex>
    )
}
