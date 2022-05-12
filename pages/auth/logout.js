import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SignOut, useUser } from '../../hooks/authUser'
import { Text, Button, Box, Center, Link } from '@chakra-ui/react'

export default function () {
    const { user } = useUser()
    const router = useRouter()

    // useEffect(() => {
    //     async function logout() {
    //         if (user) {
    //             (() => SignOut())
    //         }
    //         // router.push('/auth/login')
    //     }
    //     logout()
    // }, [user])

    return (
        <Box mt='111'>
            <Center>
                {user 
                ? <Button onClick={() => SignOut()} >Logout</Button>
                : <Link href={'/auth'} ><Button>Login</Button></Link>
            }
            </Center>
        </Box>
    )
}
