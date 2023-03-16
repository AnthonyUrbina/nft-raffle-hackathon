import {
    Box,
    Flex,
    Link,
    Button,
    Image,
    HStack,
    LinkBox,
    LinkOverlay,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    Show,
    Hide,
    Heading
} from '@chakra-ui/react'
import { CreateRaffleForm } from '../../elements'

export const CreateRaffle = () => {
    return (
        <>
        <Heading fontFamily='Inter' as='h3' fontWeight='semibold' p='.5rem'>
            Create Raffle
        </Heading>
        <CreateRaffleForm/>
        </>
    )
}
