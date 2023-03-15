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
    Icon
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
// import { GiHamburgerMenu } from 'react-icons/gi'
import { useRouter } from 'next/router';
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import NextLink from 'next/link';
import * as routes from '../../../constants/routes';

const alchemyId = 'EoOTjHvOIujYqlStV6ppG71Y7Cf94wRj';

const client = createClient(
    getDefaultClient({
        appName: "ROFL",
        alchemyId,
    }),
);

export const NavigationBar = () => {
    const router = useRouter()

    return (
        <Flex justifyContent="space-between" alignItems="center" borderBottom="1px">
            <Box paddingLeft={['.5rem', null, '1.5rem']} paddingY='.5rem'>
                <Image boxSize='3rem' src='/static/rofl-logo.png' alt='rofl-logo.png'/>
            </Box>
            <Flex borderRadius='.25rem' boxShadow='shadows.grey'>
                <AddIcon m='.5rem' boxSize={5}/>
            </Flex>
            <Box paddingRight={['.5rem', null, '1.5rem']} paddingY='.5rem'>
                    <WagmiConfig client={client}>
                        <ConnectKitProvider theme='rounded'>
                            <ConnectKitButton />
                        </ConnectKitProvider>
                    </WagmiConfig>
             </Box>
        </Flex>
    )

}
