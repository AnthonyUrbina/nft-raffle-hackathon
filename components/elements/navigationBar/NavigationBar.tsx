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
} from '@chakra-ui/react'
// import { GiHamburgerMenu } from 'react-icons/gi'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import * as routes from '../../../constants/routes'

export const NavigationBar = () => {
    const router = useRouter()

    return (
        <Flex
            position="absolute"
            top={0}
            justifyContent={['initial', null, 'center']}
            width="100%"
            opacity={0.99}
        >
            <Box
                position="absolute"
                height="100%"
                width="100%"
                bgGradient="linear(to-r, backgroundGradientPrimary, backgroundGradientSecondary)"
                filter="blur(24px)"
                opacity={0.99}
            />

            <Flex
                justifyContent="center"
                width="100%"
                backgroundColor="white"
                opacity={0.99}
            >
                <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    height={['100px', null, '160px']}
                    width={['100%', null, null, null, '80em']}
                    paddingLeft={4}
                    paddingRight={4}
                    marginLeft={[0, null, 4]}
                    marginRight={[0, null, 4]}
                >

                    <Flex display={['flex', null, null, null, 'none']}>
                        <Menu >
                            <MenuButton
                                as={IconButton}
                                // aria-label='Options'
                                // icon={<GiHamburgerMenu />}
                                variant='outline'
                            >

                            </MenuButton>
                            <MenuList marginTop={3} pl={10} minW="0" borderRadius={'25px'} w={'255px'}>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Flex>
        </Flex >
    )
}
