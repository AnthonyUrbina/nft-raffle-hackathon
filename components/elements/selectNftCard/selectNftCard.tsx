import { useState } from 'react'
import {
    Box,
    Flex,
    Text,
    Link,
    LinkBox,
    Image,
    LinkOverlay,
    ListItem
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
        <ListItem>
            <Image alt={title} src={image}/>
            <Text>{title}</Text>
        </ListItem>
    )
}
