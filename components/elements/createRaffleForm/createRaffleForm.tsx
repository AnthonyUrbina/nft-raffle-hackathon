import {
    Box,
    Flex,
    Button,
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
import { ReactNode, useState } from 'react'
import { SelectNftCard } from '../selectNftCard';
import { CreateRaffleContainerProps } from '../../../pages/create-raffle'
import { NftData } from '../../../pages/create-raffle';

interface NftDataContractReady extends Omit<NftData, 'image'> {}

export const CreateRaffleForm = ({ nfts }: CreateRaffleContainerProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedNftData, setSelectedNftData] = useState<NftDataContractReady | null>(null);
    const CURRENT_DATE_AND_TIME = new Date().toISOString().slice(0, 16);

    let count = -1;
    const createSelectNftCardLi = () => {
        const nftCardComponents: ReactNode[] = nfts.map(nft => {
            const {title, tokenId, image} = nft
            count++
            return(
                <SelectNftCard key={count} title={title} image={image} handleSelectedNft={handleSelectedNft} count={count} />
            )
        })
        return nftCardComponents
    }

    const formik = useFormik({
        initialValues: {
            reservePrice: '0.01',
            ticketPrice: '0.01',
            calendar: CURRENT_DATE_AND_TIME

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
                .matches(/^(\d{1,18}(\.\d{0,18})?)?$/, '18 decimal places max')
        }),
        onSubmit: (values) => {
            console.log('hellooo')
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handleErrMessages = (fieldId: string) => {
        const fieldErrs = fieldId === 'ticketPrice' ? errors.ticketPrice : errors.reservePrice
       return fieldErrs ? <FormErrorMessage mt='none' mb='.25rem' fontSize='9px' textAlign={['center', null, null, 'initial']}>{fieldErrs}</FormErrorMessage>
            : <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign={['center', null, null, 'initial']}>Choose your price per ticket</FormHelperText>
    }

    const handleSelectedNft = (event: React.MouseEvent<HTMLButtonElement>, selectedNft: number) => {
        const { target } = event
        const { title, tokenId, collectionAddress} = nfts[selectedNft]
        const nftData: NftDataContractReady = {
            title,
            tokenId,
            collectionAddress
        }
        setSelectedNftData(nftData)
    }

    const { getFieldProps, handleSubmit, errors } = formik

    return (
        <>
        <Flex flexDir={['column', null, null, 'row']} ml='.5rem'>
            <Flex border='1px' rounded='1rem' align='center' justify='center' boxSize={353} m={['0 auto', null, null, 'initial']} bgColor='#D9D9D9' onClick={onOpen}>
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
            <form onSubmit={handleSubmit}>
                <FormControl w={['353px', null, null, '175px']} m={['0 auto', null, null, 'initial']} ml={[null, null, null, 10]} mt={['.75rem', null, null, '0']}>
                    <Flex p='1rem' justify='space-between' rounded='1rem' border='1px' mb={['.75rem', null, null, '.75rem']} flexDir='column' w={['353px', null, null, '175px']}>
                        <Flex flexDir={['row', null, null, 'column']} justify='space-between'>
                            <Flex direction='column'>
                                <FormControl>
                                        <FormLabel htmlFor='currency' marginEnd='none' mb='none' textAlign={['center', null, null, 'initial']}>Currency</FormLabel>
                                    <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign={['center', null, null, 'initial']}>The token used for buying tickets</FormHelperText>
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
                                        <FormLabel htmlFor='ticketPrice' marginEnd='none' mb='none' textAlign={['center', null, null, 'initial']}>Ticket Price</FormLabel>
                                    {handleErrMessages('ticketPrice')}
                                    <Input
                                        id='ticketPrice'
                                        type='text'
                                        w='150px'
                                        h='25px'
                                        rounded='1rem'
                                        borderColor='black'
                                        textAlign='center'
                                        {...getFieldProps('ticketPrice')}/>
                                </FormControl>
                            </Flex>
                        </Flex>
                            <Flex flexDir={['row', null, null, 'column']} justify='space-between'>
                            <Flex direction='column'>
                                <FormControl isInvalid={!!errors.reservePrice}>
                                        <FormLabel htmlFor="reservePrice" marginEnd='none' mb='none' textAlign={['center', null, null, 'initial']}>Reserve Price</FormLabel>
                                    {handleErrMessages('reservePrice')}
                                    <Input
                                        id="reservePrice"
                                        w='150px' h='25px'
                                        rounded='1rem'
                                        borderColor='black'
                                        textAlign='center'
                                        {...getFieldProps('reservePrice')} />
                                </FormControl>
                            </Flex>
                            <Flex direction='column'>
                                <FormControl>
                                    <FormLabel htmlFor='calendar' marginEnd='none' mb='none' textAlign={['center', null, null, 'initial']}>Raffle End Date</FormLabel>
                                    <FormHelperText mt='none' mb='.25rem' fontSize='9px' textAlign={['center', null, null, 'initial']}>Raffle minimum</FormHelperText>
                                    <Input
                                        id="calendar"
                                        w='150px'
                                        h='25px'
                                        rounded='1rem'
                                        borderColor='black'
                                        size="md"
                                        type="datetime-local"
                                        min={CURRENT_DATE_AND_TIME}
                                        textAlign='center'
                                        {...getFieldProps('calendar')} />
                                </FormControl>
                            </Flex>
                        </Flex>
                    </Flex>
                        <Flex justify='center'>
                        <Button type='submit' bgColor='black' color='white' rounded='1.5rem' fontFamily='Inter' fontWeight='normal' w='100%'>
                            Create Raffle
                        </Button>
                    </Flex>
                </FormControl>
            </form>
        </Flex>
    </>
    )
}
