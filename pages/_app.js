import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import { ApolloProvider } from '@apollo/client'
import { RequireAuth, UserContextProvider } from '../hooks/authUser'
import { ChakraProvider, useDisclosure, Portal } from '@chakra-ui/react'
import { supabase } from '../utils/initSupabase'
import { myTheme } from '../theme/theme'
import MainPanel from '../components/Layout/MainPanel'
import Sidebar from '../components/Sidebar'
// import FixedPlugin from '../components/FixedPlugin/FixedPlugin'
import Notifications from '../components/FixedPlugin/notificationPlugin'
import ToggleMode from '../components/FixedPlugin/toggleMode'
import { getActiveNavbar } from '../utils/sidebarFncs'
import { useEffect, useState } from 'react'
import {
    HomeIcon,
    StatsIcon,
    CreditIcon,
    PersonIcon,
    DocumentIcon,
    RocketIcon,
    SupportIcon,
} from '../components/Icons/Icons'

var routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: <HomeIcon color="inherit" />,
        layout: '/admin',
    },
    {
        path: '/tables',
        name: 'Tables',
        icon: <StatsIcon color="inherit" />,
        layout: '/admin',
    },
    {
        path: '/billing',
        name: 'Billing',
        icon: <CreditIcon color="inherit" />,
        layout: '/admin',
    },
    {
        name: 'ACCOUNT PAGES',
        category: 'account',
        state: 'pageCollapse',
        views: [
            {
                path: '/profile',
                name: 'Profile',
                icon: <PersonIcon color="inherit" />,
                secondaryNavbar: true,
                layout: '/admin',
            },
            {
                path: '/logout',
                name: 'Logout',
                icon: <DocumentIcon color="inherit" />,
                layout: '/auth',
            },
        ],
    },
]

export default function MyApp({ Component, pageProps }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [fixed, setFixed] = useState(false)

    // const router = useRouter();

    // const [activeRoute, setActiveRoute] = useState();
    // const [activeNavbar, setActiveNavbar] = useState()

    // useEffect(() => {
    //   setActiveRoute(getActiveRoute(routes, router))
    //   setActiveNavbar(getActiveNavbar(routes, router))
    // }, [router, routes])

    return (
        <main>
            <UserContextProvider>
                <ApolloProvider client={supabase}>
                    <ChakraProvider theme={myTheme}>
                        <Sidebar
                            routes={routes}
                            logoText={'SWOLE DASHBOARD'}
                            display="none"
                            sidebarVariant="opaque"
                        />
                        <MainPanel
                            p="11"
                            w={{
                                base: '100%',
                                xl: 'calc(100% - 275px)',
                            }}
                        >
                            <Portal>
                                <ToggleMode />
                            </Portal>
                            <Portal>
                                <Notifications />
                            </Portal>
                            <Component {...pageProps} />
                        </MainPanel>
                    </ChakraProvider>
                </ApolloProvider>
            </UserContextProvider>
        </main>
    )
}
