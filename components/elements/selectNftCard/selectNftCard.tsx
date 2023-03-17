import { useState } from 'react'
import {
    Box,
    Flex,
    Text,
    Link,
    LinkBox,
    Image,
    LinkOverlay,
    ListItem,
    Button
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import * as routes from '../../../constants/routes';

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
