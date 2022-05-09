import { Box, useStyleConfig } from '@chakra-ui/react'
import { RequireAuth } from '../../hooks/authUser'
function MainPanel(props) {
    const { variant, children, ...rest } = props
    const styles = useStyleConfig('MainPanel', { variant })

    RequireAuth()
    // Pass the computed styles into the `__css` prop
    return (
        <Box __css={styles} {...rest}>
            {children}
        </Box>
    )
}

export default MainPanel
