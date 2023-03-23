import {
    Flex,
    Text,
    Image,
    ListItem,
    Button,
    Box,
    List,
    Heading,
    HStack,
    Input,
    UnorderedList

} from '@chakra-ui/react'
import { useNumberInput } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from "yup"

// figure out if you can pull all data in RaffleCard component
// then when user clicks, pass props to here
// instead of having to pass raffle id then make another fetch

export const QuantityButton = () => {

    const formik = useFormik({
        initialValues: {
            ticketQuantity: 3
        },
        validationSchema: yup.object({
            ticketQuantity: yup
                .number()
                .required()
                .integer('Must be a whole number')
                .min(1, 'Must be greater than zero')
        }),
        onSubmit: values => {
            console.log('form submit', values);
        },
    });

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 3,
            min: 1,
            max: 100,
            precision: 0,
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    const { getFieldProps, handleSubmit, errors } = formik

    return (
        <HStack maxW='170px'>
            <Button background={'transparent'} {...inc}>+</Button>
            <Input
                {...getFieldProps('ticketQuantity')}
                textAlign={'center'}
                rounded={20}
                {...input} />
            <Button background={'transparent'} {...dec}>-</Button>
        </HStack>
    )
}
