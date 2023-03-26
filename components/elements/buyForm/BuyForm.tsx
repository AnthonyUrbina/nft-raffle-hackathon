import {
    Flex,
    Text,
    Image,
    ListItem,
    Button,
    Box,
    HStack,
    Input,
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as yup from "yup"
import { ChangeEvent, useState } from 'react'
import {ethers} from 'ethers'
import raffleAbi from '../../../nftRaffleAbi.json'


type FormValidationErrors = {
    ticketQuantity: number
}

export const BuyForm = ({ticketPrice, raffleId}) => {
    const [ticketQuantity, setTicketQuantity] = useState(3)


        const validationSchema = yup.object({
            ticketQuantity: yup
                .number()
                .required()
                .integer('Must be a whole number')
                .min(1, 'Must be greater than zero')
                .max(99, 'Must be less than 100')
        })

    const handleClick = (action: string) => {
        action === 'increment' ? setTicketQuantity(ticketQuantity + 1) : setTicketQuantity(ticketQuantity - 1)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event
        const value = Number(target.value)
        setTicketQuantity(value)
    }

    const buyTickets = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const ethPrice = (ticketPrice / 1000000000000000000) * parseInt(formData.get("ticketQuantity"))
        const costInWei = ethers.utils.parseEther(ethPrice.toString())

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        console.log("ethPRice", ethPrice)
        console.log("costinWei", costInWei)

        const raffleContract = new ethers.Contract("0x55BfeD48a2236d892831f11b8E0D48CAF3275B70", raffleAbi, signer);
        const buyRaffleTx = await raffleContract.buyRaffleTickets(raffleId, formData.get("ticketQuantity"), { value: costInWei });

        console.log('Transaction hash:', buyRaffleTx.hash);
        console.log('Waiting for transaction to be mined...');

        await buyRaffleTx.wait();

        console.log('Transaction mined!');
    }

    return (
        <Formik
        initialValues={{ticketQuantity: 3}}
        validationSchema={validationSchema}
        onSubmit={() => {
            console.log('values', ticketQuantity)
        }}
        >
            {formik => (
            <Form
            onSubmit={buyTickets}>
                <FormControl isInvalid={!!formik.errors.ticketQuantity}>
                    <Flex rounded={10} py={2} justifyContent={['space-between']}>
                        <Flex basis={['30%']}>
                            <HStack>
                                <Button flexBasis={'20%'} background={'transparent'} onClick={() => handleClick('increment')}>+</Button>
                                <Input
                                type='number'
                                name='ticketQuantity'
                                minW={'3rem'}
                                textAlign={'center'}
                                rounded={20}
                                onChange={handleChange}
                                value={ticketQuantity} />
                                <Button flexBasis={'20%'} background={'transparent'} onClick={() => handleClick('decrement')}>-</Button>
                            </HStack>
                        </Flex>
                        <Flex basis={['70%']}>
                            <Button
                            w={['100%']}
                            maxW={['160px']}
                            rounded={20}
                            type='submit'>
                                { `Buy ${ticketQuantity} Tickets Now` }
                            </Button>
                        </Flex>
                    </Flex>
                    <FormErrorMessage>{formik.errors.ticketQuantity}</FormErrorMessage>
                </FormControl>
            </Form>
            )}
        </Formik>
    )
}
