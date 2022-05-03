import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SignOut, useUser } from '../../hooks/authUser'

export default function () {
    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        async function logout() {
            if (user) {
                await (() => SignOut())
            }
            router.push('/')
        }
        logout()
    }, [user])
}
