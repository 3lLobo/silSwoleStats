import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SignOut, useUser } from '../../hooks/authUser'
import { Text, Button, Box } from '@chakra-ui/react'

export default function () {
    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        async function logout() {
            if (user) {
                await (() => SignOut())
            }
            // router.push('/auth/login')
        }
        logout();
    }, [user])

    return (
        <Box
        center="center">
            {user ?
                (<Text> Logging out ... </Text>) : (
                    <Button>
                        Login!
                    </Button>
                )}
        </Box>
    )
}
