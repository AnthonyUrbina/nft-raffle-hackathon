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

type FormValidationErrors = {
    ticketQuantity: number
}

export const BuyForm = () => {
    const [ticketQuantity, setTicketQuantity] = useState(3)


        const validationSchema = yup.object({
            ticketQuantity: yup
                .number()
                .required()
                .integer('Must be a whole number')
                .min(1, 'Must be greater than zero')
        })

    const handleClick = (action: string) => {
        action === 'increment' ? setTicketQuantity(ticketQuantity + 1) : setTicketQuantity(ticketQuantity - 1)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event
        const value = Number(target.value)
        setTicketQuantity(value)
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
            onSubmit={formik.handleSubmit}>
                <FormControl isInvalid={!!formik.errors.ticketQuantity}>
                    <Flex rounded={10} py={2} justifyContent={['space-between']}>
                        <Flex basis={['30%']}>
                            <HStack>
                                <Button flexBasis={'20%'} background={'transparent'} onClick={() => handleClick('increment')}>+</Button>
                                <Input
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
                                { `Buy ${ticketQuantity} Tickets Now ` }
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
