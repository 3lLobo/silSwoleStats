// Chakra Imports
import { Button, useColorModeValue } from '@chakra-ui/react'
// Custom Icons
import PropTypes from 'prop-types'
import React from 'react'
import ToggleMode from './toggleMode'

export default function FixedPlugin(props) {
    const { secondary, onChange, onSwitch, fixed, ...rest } = props
    // Chakra Color Mode
    let navbarIcon = useColorModeValue('gray.500', 'gray.200')
    let bgButton = useColorModeValue('#f5f5f5', 'gray.600')
    let fixedDisplay = 'flex'

    return (
        <>
            <Button
                h="52px"
                w="52px"
                bg={bgButton}
                position="fixed"
                variant="no-hover"
                right="35px"
                bottom="30px"
                borderRadius="50px"
                boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
            ></Button>
        </>
    )
}

FixedPlugin.propTypes = {
    fixed: PropTypes.bool,
    onChange: PropTypes.func,
    onSwitch: PropTypes.func,
}
