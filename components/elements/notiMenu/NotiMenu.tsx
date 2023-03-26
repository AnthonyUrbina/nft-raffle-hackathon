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
    Hide
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { mainnet, goerli, optimism, polygon, polygonMumbai } from "wagmi/chains";

export const NotiMenu = ({ notifications }) => {

    console.log('checking to see if notis passed as props are getting updated', notifications)
    const menuItemFactory = notifications => {
        console.log('rendering again in menuItemFactory', notifications)
        const menuItemList = notifications.map(notification => {
            console.log('noti', notification)
            const { title, message, image, url, cta, sid } = notification
            if (notification) {
                return (
                    <MenuItem key={sid}>
                        <Flex w={'290px'} align={'center'}>
                            <Flex flexDir={'column'} basis={'15%'} mr={3}>
                                <Image rounded={6} alt={image} src={image}></Image>
                            </Flex>
                            <Flex flexDir={'column'} basis={'75%'}>
                                <Text>{title}</Text>
                                <Text>{message}</Text>
                            </Flex>
                            <Flex basis={'10%'} justify={'flex-start'}>
                                <CloseIcon boxSize={'8px'} />
                            </Flex>
                        </Flex>
                    </MenuItem>
                )
            } else {
                return <Text key={'filler'}>There are no new Notifications. </Text>
            }
        })
        return menuItemList
    }

    return (
        <MenuList>
            {menuItemFactory(notifications)}
        </MenuList>
    )

}
