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
    Heading,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'

export interface CreateRaffleFormProps {
    title: string
    description: string
    image: string
    altText: string
    date: string
    route: string
    past: boolean
}

export const CreateRaffleForm = ({
    title,
    description,
    image,
    altText,
    date,
    route,
    past
}: CreateRaffleFormProps) => {
    const [currency, setCurrency] = useState('ETH')
    return (
        <>
    <Flex border='1px' rounded='1rem' align='center' justify='center' boxSize={353} m='0 auto' bgColor='#D9D9D9'>
        <Box>
            <Button leftIcon={<AddIcon mb='.5rem' boxSize={9}/>} display='flex' flexDir='column' bgColor='#D9D9D9'>
                Select NFT
            </Button>
        </Box>
    </Flex>
        <FormControl >
            <Flex p='1rem' flexWrap='wrap' justify='space-between' rounded='1rem' border='1px' m='.75rem'>
                <Flex direction='column' align='center'>
                    <FormLabel marginEnd='none' mb='none'>Currency</FormLabel>
                    <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>The token used for buying tickets</FormHelperText>
                    <Select placeholder='MATIC' w='150px' h='25px' textAlign='center' rounded='1rem' borderColor='black'>
                        <option value="APE COIN">APE COIN</option>
                    </Select>
                </Flex>
                <Flex direction='column' align='center'>
                    <FormLabel marginEnd='none' mb='none' >Ticket Price</FormLabel>
                    <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Choose your price per ticket</FormHelperText>
                    <Input type='number' w='150px' h='25px' rounded='1rem' borderColor='black'></Input>
                </Flex>
                <Flex direction='column' align='center' pt='1rem'>
                    <FormLabel marginEnd='none' mb='none'>Reserve Price</FormLabel>
                    <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Raffle minimum</FormHelperText>
                    <Input type='number' w='150px' h='25px' rounded='1rem' borderColor='black'></Input>
                </Flex>
                <Flex direction='column' align='center' pt='1rem'>
                    <FormLabel marginEnd='none' mb='none'>Raffle End Date</FormLabel>
                    <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Raffle minimum</FormHelperText>
                    <Input type='number' w='150px' h='25px' rounded='1rem' borderColor='black'></Input>
                </Flex>
            </Flex>
            <Flex justify='center' pb='.5rem'>
                <Button bgColor='black' color='white' rounded='1.5rem' fontFamily='Inter' fontWeight='normal' paddingX='8rem'>
                Create Raffle
                </Button>
            </Flex>
    </FormControl>
    </>
    )
}
