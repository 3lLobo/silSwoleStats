import React from 'react'
import { AuthRedirect } from '../../hooks/authUser'
import { supabase } from '../../utils/initSupabase'
import { Auth, Card, Typography, Space } from '@supabase/ui'
import { AbsoluteCenter, Box, Center } from '@chakra-ui/react'

const AuthPage = () => {
    AuthRedirect()

    return (
        <Box mt='36'>
            <Center>
                <Card style={{'background': 'whitesmoke'}}>
                    <Space direction="vertical" size={8}>
                        <Box>
                            <Center>
                                <Typography.Title level={3}>Welcome</Typography.Title>
                            </Center>
                        </Box>
                        <Auth
                            supabaseClient={supabase}
                            providers={['linkedin', 'google']}
                            view={'sign_in'}
                            socialLayout="vertical"
                            socialButtonSize="xlarge"
                            // socialColors={TrustedScriptURL}
                        />
                    </Space>
                </Card>
            </Center>
        </Box>
    )
}

export default AuthPage
