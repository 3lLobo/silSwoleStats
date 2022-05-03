// Chakra Icons
import { BellIcon } from '@chakra-ui/icons'
// Chakra Imports
import {
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorModeValue,
    Button,
} from '@chakra-ui/react'

// Custom Components
import { ItemContent } from '../Menu/ItemContent'
import React from 'react'
import { useUser } from '../../hooks/authUser'

export default function Notifications(props) {
    const { variant, children, fixed, secondary, onOpen, ...rest } = props
    const { user } = useUser()

    // Chakra Color Mode
    let mainTeal = useColorModeValue('teal.300', 'teal.300')
    let inputBg = useColorModeValue('white', 'gray.800')
    let mainText = useColorModeValue('gray.700', 'gray.200')
    let navbarIcon = useColorModeValue('gray.500', 'gray.200')

    // Chakra Color Mode
    let bgButton = useColorModeValue('#f5f5f5', 'gray.600')

    return (
        <>
            <Menu>
                <MenuButton
                    h="52px"
                    w="52px"
                    bg={bgButton}
                    position="fixed"
                    variant="no-hover"
                    right="35px"
                    top="30px"
                    borderRadius="50px"
                    boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
                >
                    <BellIcon color={navbarIcon} w="18px" h="18px" />
                </MenuButton>
                <MenuList p="16px 8px">
                    <Flex flexDirection="column">
                        <MenuItem borderRadius="8px" mb="10px">
                            <ItemContent
                                time="13 minutes ago"
                                // info="from Alicia"
                                boldInfo="Weekly check in due!"
                                key="1"
                                // aName="Alicia"
                                // aSrc={avatar1}
                            />
                        </MenuItem>
                        <MenuItem borderRadius="8px" mb="10px">
                            <ItemContent
                                time="2 days ago"
                                info=""
                                boldInfo="Mealplan update!"
                                key="2"
                                // aName="Josh Henry"
                                // aSrc={avatar2}
                            />
                        </MenuItem>
                    </Flex>
                </MenuList>
            </Menu>
        </>
    )
}
