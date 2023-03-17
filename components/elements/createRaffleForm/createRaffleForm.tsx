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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    UnorderedList,
    SimpleGrid
} from '@chakra-ui/react'
import { AddIcon} from '@chakra-ui/icons'
import { useDisclosure } from '@chakra-ui/react'
import { useFormik } from "formik";
import * as yup from "yup"
import { useState, useEffect, ReactNode } from 'react'
import { SelectNftCard } from '../selectNftCard';
import { CreateRaffleContainerProps } from '../../../pages/create-raffle'

export const CreateRaffleForm = ({ nfts }: CreateRaffleContainerProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const createSelectNftCardLi = () => {
        const nftCardComponents: ReactNode[] = nfts.map(nft => {
            const {title, tokenId, image} = nft
            return(
                <SelectNftCard key={tokenId} title={title} image={image} />
            )
        })
        return nftCardComponents
    }

    const formik = useFormik({
        initialValues: {
            reservePrice: '0.01',
            ticketPrice: '0.01'
        },
        validationSchema: yup.object({
            ticketPrice: yup
                .string()
                .required()
                .matches(/^[0-9]+(?:\.[0-9]*)?$/gm, 'Please enter a valid amount')
                .matches(/^(\d{1,18}(\.\d{0,18})?)?$/, '18 decimal places max')
                .matches(/^(?!0\d)(?:\d{1,14}(?:\.\d{0,18})?|100000000000000(?:\.0{1,18})?)$/, 'The amount cannot exceed 100,000,000,000,000'),
            reservePrice: yup
                .string()
                .required()
                .matches(/^[0-9]+(?:\.[0-9]*)?$/gm, 'Please enter a valid amount')
                .matches(/^(?!0\d)(?:\d{1,14}(?:\.\d{0,18})?|100000000000000(?:\.0{1,18})?)$/, 'The amount cannot exceed 100,000,000,000,000')
                .matches(/^(\d{1,18}(\.\d{0,18})?)?$/, '18 decimal places max'),
            calendar: yup
                .string()
                .required()
                .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, 'Invalid timestamp')
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const handleErrMessages = (fieldId: string) => {
        const fieldErrs = fieldId === 'ticketPrice' ? errors.ticketPrice : errors.reservePrice
       return fieldErrs ? <FormErrorMessage mt='none' mb='.25rem' fontSize='9px' textAlign='center'>{fieldErrs}</FormErrorMessage>
            : <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>Choose your price per ticket</FormHelperText>
    }

    const { ticketPrice, reservePrice } = formik.values
    const { handleChange, getFieldProps, errors } = formik

    const CURRENT_DATE_AND_TIME = new Date().toISOString().split(".")[0]

    return (
        <>
            <Flex border='1px' rounded='1rem' align='center' justify='center' boxSize={353} m='0 auto' bgColor='#D9D9D9' onClick={onOpen}>
                <Box>
                    <Button leftIcon={<AddIcon mb='.5rem' boxSize={9}/>} display='flex' flexDir='column' bgColor='#D9D9D9'>
                        Select NFT
                    </Button>
                </Box>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size={{ base: "90vw", md: "90vh" }} motionPreset='slideInBottom' scrollBehavior='inside'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'} fontSize={'3xl'} pb={'.5rem'}>Select NFT</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb='2rem' px={'1.25rem'}>
                        <UnorderedList styleType='none' m='0'>
                            <SimpleGrid spacing='1.25rem' minChildWidth='157px'>
                                {createSelectNftCardLi()}
                            </SimpleGrid>
                        </UnorderedList>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <FormControl>
                <Flex p='1rem' flexWrap='wrap' justify='space-between' rounded='1rem' border='1px' m='.75rem'>
                    <Flex direction='column'>
                        <FormControl>
                            <FormLabel htmlFor='currency' marginEnd='none' mb='none' textAlign='center'>Currency</FormLabel>
                            <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign='center'>The token used for buying tickets</FormHelperText>
                            <Select
                                id='currency'
                                name='currency'
                                placeholder='ETH'
                                w='150px' h='25px'
                                textAlign='center'
                                rounded='1rem'
                                borderColor='black'>
                                <option value="APE">APE</option>
                            </Select>
                        </FormControl>
                    </Flex>
                    <Flex direction='column'>
                        <FormControl isInvalid={!!errors.ticketPrice}>
                            <FormLabel htmlFor='ticketPrice' marginEnd='none' mb='none' textAlign='center'>Ticket Price</FormLabel>
                            {handleErrMessages('ticketPrice')}
                            <Input
                                id='ticketPrice'
                                type='text'
                                w='150px'
                                h='25px'
                                rounded='1rem'
                                borderColor='black'
                                {...getFieldProps('ticketPrice')}/>
                        </FormControl>
                    </Flex>
                    <Flex direction='column' pt='1rem'>
                        <FormControl isInvalid={!!errors.reservePrice}>
                            <FormLabel htmlFor="reservePrice" marginEnd='none' mb='none' textAlign='center'>Reserve Price</FormLabel>
                            {handleErrMessages('reservePrice')}
                            <Input
                                id="reservePrice"
                                w='150px' h='25px'
                                rounded='1rem'
                                borderColor='black'
                                {...getFieldProps('reservePrice')} />
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
                                min={CURRENT_DATE_AND_TIME}
                                {...getFieldProps('calendar')}/>
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
