import { useState } from 'react'
import {
    Flex,
    Text,
    Image,
    ListItem,
    Button
} from '@chakra-ui/react'

export interface SelectNftCardProps {
    title: string
    image: string
}

export const SelectNftCard = ({
     title,
     image
    }: SelectNftCardProps) => {
    return (
        <ListItem w='100%' h='189px' listStyleType='none'>
            <Button border='1px' rounded='1.5rem' h='100%' p='0' display='flex' flexDir={'column'} justifyContent='flex-start' w='100%' bgColor={'white'}>
                <Image borderTopRadius='1.4rem' alt={title} src={image} w='100%' h={'80%'} fit={'cover'}/>
                <Flex w='80%' flexGrow={1} align={'center'} justify={'center'}>
                    <Text isTruncated maxWidth='100%'>{title}</Text>
                </Flex>
            </Button>
        </ListItem>
    )
}
