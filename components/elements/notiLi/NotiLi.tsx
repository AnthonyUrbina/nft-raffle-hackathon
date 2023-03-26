import {
    Box,
    Flex,
    Link,
    Button,
    Image,
    HStack,
    MenuItem,
    Text,
    Show,
    Hide,
    List,
    ListItem
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { mainnet, goerli, optimism, polygon, polygonMumbai } from "wagmi/chains";

export const NotiLi = ({ notifications }) => {

    console.log('checking to see if notis passed as props are getting updated', notifications)
    const menuItemFactory = notifications => {
        console.log('rendering again in menuItemFactory', notifications)
        const menuItemList = notifications.map(notification => {
            console.log('noti', notification)
            const { title, message, image, url, cta, sid } = notification
            return (
                <ListItem key={sid} border='1px' rounded={9} transition="transform 0.2s ease-in-out" _hover={{ transform: "scale(1.02)" }} cursor={'pointer'} p={4}>
                    <Link href={cta}>
                        <Flex align={'center'}>
                            <Flex flexDir={'column'} basis={'20%'} mr={3}>
                                <Image rounded={6} alt={image} src={image}></Image>
                            </Flex>
                            <Flex flexDir={'column'} basis={'65%'}>
                                <Text fontSize={'md'}>{title}</Text>
                                <Text fontSize={'md'}>{message}</Text>
                            </Flex>

                        </Flex>
                    </Link>
                </ListItem>
            )
        })
        return menuItemList
    }

    return (
        <List spacing={3}>
            {menuItemFactory(notifications)}
        </List>
    )

}
