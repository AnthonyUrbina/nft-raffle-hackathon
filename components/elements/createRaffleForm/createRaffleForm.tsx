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
    Select,
    VStack
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useFormik } from "formik";
import * as yup from "yup"
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
    const CURRENT_DATE_AND_TIME = new Date().toISOString().split(".")[0]

    const formik = useFormik({
        initialValues: {
            reservePrice: '0.01',
            ticketPrice: '0.01'
        },
        validationSchema: yup.object({
            ticketPrice: yup
                .string()
                .matches(/^[0-9]+(?:\.[0-9]*)?$/gm, 'Please enter a valid amount')
                .matches(/^(\d{1,18}(\.\d{0,18})?)?$/, '18 decimal places max')
                .matches(/^(?!0\d)(?:\d{1,14}(?:\.\d{0,18})?|100000000000000(?:\.0{1,18})?)$/, 'The amount cannot exceed 100,000,000,000,000'),
            reservePrice: yup
                .string()
                .matches(/^[0-9]+(?:\.[0-9]*)?$/gm, 'Please enter a valid amount')
                .matches(/^(?!0\d)(?:\d{1,14}(?:\.\d{0,18})?|100000000000000(?:\.0{1,18})?)$/, 'The amount cannot exceed 100,000,000,000,000')
                .matches(/^(\d{1,18}(\.\d{0,18})?)?$/, '18 decimal places max'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });


    const { ticketPrice, reservePrice } = formik.values
    const { handleChange, errors } = formik

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
                    <Flex direction='column'>
                        <FormControl>
                            <FormLabel htmlFor='currency' marginEnd='none' mb='none' textAlign='center'>Currency</FormLabel>
                            <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>The token used for buying tickets</FormHelperText>
                            <Select
                                id='currency'
                                placeholder='MATIC'
                                w='150px' h='25px'
                                textAlign='center'
                                rounded='1rem'
                                borderColor='black'>
                                <option value="APE COIN">APE COIN</option>
                            </Select>
                        </FormControl>
                    </Flex>
                    <Flex direction='column'>
                        <FormControl isInvalid={!!errors.ticketPrice}>
                            <FormLabel htmlFor='ticket-price' marginEnd='none' mb='none' textAlign='center'>Ticket Price</FormLabel>
                            {
                                errors.ticketPrice ? <FormErrorMessage mt='none' mb='.25rem' fontSize='9px' textAlign='center'>{errors.ticketPrice}</FormErrorMessage>
                                    : <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Choose your price per ticket</FormHelperText>

                            }
                            <Input
                                id='ticket-price'
                                name='ticketPrice'
                                type='text'
                                w='150px'
                                h='25px'
                                rounded='1rem'
                                borderColor='black'
                                value={ticketPrice}
                                onChange={handleChange}/>
                        </FormControl>
                    </Flex>
                    <Flex direction='column' pt='1rem'>
                        <FormControl>
                            <FormLabel marginEnd='none' mb='none' textAlign='center'>Reserve Price</FormLabel>
                            <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Choose your price per ticket</FormHelperText>
                            <Input
                                id="reserve-price"
                                name='reservePrice'
                                w='150px' h='25px'
                                rounded='1rem'
                                borderColor='black'
                                value={reservePrice}
                                onChange={handleChange}/>
                        </FormControl>
                    </Flex>
                    <Flex direction='column' pt='1rem'>
                        <FormControl>
                            <FormLabel htmlFor='calendar' marginEnd='none' mb='none'>Raffle End Date</FormLabel>
                            <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Raffle minimum</FormHelperText>
                            <Input
                                id="calendar"
                                w='150px'
                                h='25px'
                                rounded='1rem'
                                borderColor='black'
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local"
                                min={CURRENT_DATE_AND_TIME}/>
                        </FormControl>
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
