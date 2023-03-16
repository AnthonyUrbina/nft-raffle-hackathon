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

// export interface CreateRaffleFormProps {
//     title: string
//     description: string
//     image: string
//     altText: string
//     date: string
//     route: string
//     past: boolean
// }

export const CreateRaffleForm = () => {
    const [ticketPrice, setTicketPrice] = useState('')
    const [reservePrice, setReservePrice] = useState('')
    const [err, setErr] = useState('')

    const [maxPrecisionTicketErr, setMaxPrecisionTicketErr] = useState(false)
    const [maxPrecisionReserveErr, setMaxPrecisionReserveErr] = useState(false)
    const CURRENT_DATE_AND_TIME = new Date().toISOString().split(".")[0]


    const handleTicketPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const parsedValue = parseFloat(value);
        const MAX_DECIMAL_PLACES = 18
        setTicketPrice(value);
        if (parsedValue && value.includes('.') && value.split('.')[1].length > MAX_DECIMAL_PLACES) {
            setErr('18 decimal points is the maximum precision supported by Ethereum')
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
            setErr('18 decimal points is the maximum precision supported by Ethereum')
            setMaxPrecisionReserveErr(true)
        } else {
            setMaxPrecisionReserveErr(false)

        }
    };

    const displayErrMsg = () => {
        err && <FormErrorMessage>{ err }</FormErrorMessage>
    }

    return (
        <>
    <Flex border='1px' rounded='1rem' align='center' justify='center' boxSize={353} m='0 auto' bgColor='#D9D9D9'>
        <Box>
            <Button leftIcon={<AddIcon mb='.5rem' boxSize={9}/>} display='flex' flexDir='column' bgColor='#D9D9D9'>
                Select NFT
            </Button>
        </Box>
    </Flex>
        <FormControl isInvalid={maxPrecisionReserveErr || maxPrecisionTicketErr}>
            <Flex p='1rem' flexWrap='wrap' justify='space-between' rounded='1rem' border='1px' m='.75rem'>
                <Flex direction='column' align='center'>
                    <FormLabel marginEnd='none' mb='none'>Currency</FormLabel>
                    <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>The token used for buying tickets</FormHelperText>
                    <Select placeholder='MATIC' w='150px' h='25px' textAlign='center' rounded='1rem' borderColor='black'>
                        <option value="APE COIN">APE COIN</option>
                    </Select>
                </Flex>
                <Flex direction='column' align='center'>
                    <FormLabel marginEnd='none' mb='none' textAlign='center'>Ticket Price</FormLabel>
                    <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Choose your price per ticket</FormHelperText>
                        <Input data-view-field='ticket-price' type='text' w='150px' h='25px' rounded='1rem' borderColor='black' value={ticketPrice} onChange={handleTicketPriceChange}/>
                </Flex>
                <Flex direction='column' align='center' pt='1rem'>
                        <FormLabel marginEnd='none' mb='none'>Reserve Price</FormLabel>
                        <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Choose your price per ticket</FormHelperText>
                        <Input type='text' w='150px' h='25px' rounded='1rem' borderColor='black' value={reservePrice} onChange={handleReservePriceChange}/>
                </Flex>
                <Flex direction='column' align='center' pt='1rem'>
                    <FormLabel marginEnd='none' mb='none'>Raffle End Date</FormLabel>
                    <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Raffle minimum</FormHelperText>
                    <Input
                    w='150px'
                    h='25px'
                    rounded='1rem'
                    borderColor='black'
                    placeholder="Select Date and Time"
                    size="md"
                    type="datetime-local"
                    min={CURRENT_DATE_AND_TIME}/>
                </Flex>
                {err && <FormErrorMessage fontSize='12px'>{err}</FormErrorMessage>}
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
