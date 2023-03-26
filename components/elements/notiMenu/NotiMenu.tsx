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

    const menuItemFactory = () => {
        const menuItemList = notifications.map(notification => {
            const { title, body, image, url, cta, sid } = notification
            return (
                <MenuItem key={sid}>
                    <Flex w={'290px'} align={'center'}>
                        <Flex flexDir={'column'} basis={'15%'} mr={3}>
                            <Image rounded={6} alt={image} src={'/static/supduck.png'}></Image>
                        </Flex>
                        <Flex flexDir={'column'} basis={'75%'}>
                            <Text>YOU WON THE RAFFLE</Text>
                            <Text>SupDuck 7292</Text>
                        </Flex>
                        <Flex grow={1} basis={'10%'} justify={'flex-start'}>
                            <CloseIcon boxSize={'8px'} />
                        </Flex>
                    </Flex>
                </MenuItem>
            )
        })
        return menuItemList
    }

    return (
        <MenuList>
            {menuItemFactory()}
        </MenuList>
    )

}
