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
import { ChangeEvent, useState } from 'react'

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
    const [ticketPrice, setTicketPrice] = useState('')
    const [reservePrice, setReservePrice] = useState('')

    const [maxPrecisionTicketErr, setMaxPrecisionTicketErr] = useState(false)
    const [maxPrecisionReserveErr, setMaxPrecisionReserveErr] = useState(false)


    const handleTicketPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const parsedValue = parseFloat(value);
        const MAX_DECIMAL_PLACES = 18
        setTicketPrice(value);
        if (parsedValue && value.includes('.') && value.split('.')[1].length > MAX_DECIMAL_PLACES) {
            setMaxPrecisionTicketErr(true)
        } else {
            setMaxPrecisionTicketErr(false)

        }
    };

    const handleReservePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const parsedValue = parseFloat(value);
        const MAX_DECIMAL_PLACES = 18
        setReservePrice(value);
        if (parsedValue && value.includes('.') && value.split('.')[1].length > MAX_DECIMAL_PLACES) {
            setMaxPrecisionReserveErr(true)
        } else {
            setMaxPrecisionReserveErr(false)

        }
    };

    return (
        <>
    <Flex border='1px' rounded='1rem' align='center' justify='center' boxSize={353} m='0 auto' bgColor='#D9D9D9'>
        <Box>
            <Button leftIcon={<AddIcon mb='.5rem' boxSize={9}/>} display='flex' flexDir='column' bgColor='#D9D9D9'>
                Select NFT
            </Button>
        </Box>
    </Flex>
        <FormControl>
            <Flex p='1rem' flexWrap='wrap' justify='space-between' rounded='1rem' border='1px' m='.75rem'>
                <Flex direction='column' align='center'>
                    <FormLabel marginEnd='none' mb='none'>Currency</FormLabel>
                    <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>The token used for buying tickets</FormHelperText>
                    <Select placeholder='MATIC' w='150px' h='25px' textAlign='center' rounded='1rem' borderColor='black'>
                        <option value="APE COIN">APE COIN</option>
                    </Select>
                </Flex>
                <Flex direction='column' align='center'>
                    <FormControl isInvalid={maxPrecisionTicketErr}>
                        <FormLabel marginEnd='none' mb='none' textAlign='center'>Ticket Price</FormLabel>
                        {
                            maxPrecisionTicketErr ?
                                <FormErrorMessage mt='none' mb='.25rem' fontSize='9px' textAlign='center'>18 decimal points max</FormErrorMessage>
                                : <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Choose your price per ticket</FormHelperText>
                        }
                        <Input data-view-field='ticket-price' type='text' w='150px' h='25px' rounded='1rem' borderColor='black' value={ticketPrice} onChange={handleTicketPriceChange}></Input>
                    </FormControl>
                </Flex>
                <Flex direction='column' align='center' pt='1rem'>
                    <FormControl isInvalid={maxPrecisionReserveErr}>
                        <FormLabel marginEnd='none' mb='none'>Reserve Price</FormLabel>
                        {
                            maxPrecisionReserveErr ?
                                <FormErrorMessage mt='none' mb='.25rem' fontSize='9px' textAlign='center'>18 decimal points max</FormErrorMessage>
                                : <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Choose your price per ticket</FormHelperText>
                        }
                        <Input type='number' w='150px' h='25px' rounded='1rem' borderColor='black' value={reservePrice} onChange={handleReservePriceChange}></Input>
                    </FormControl>
                </Flex>
                <Flex direction='column' align='center' pt='1rem'>
                    <FormLabel marginEnd='none' mb='none'>Raffle End Date</FormLabel>
                    <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Raffle minimum</FormHelperText>
                    <Input type='text' w='150px' h='25px' rounded='1rem' borderColor='black'></Input>
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
