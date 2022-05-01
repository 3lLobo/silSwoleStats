import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

import { ApolloProvider } from '@apollo/client'
import { UserContextProvider } from '../hooks/authUser'
import { ChakraProvider, useDisclosure, Portal } from '@chakra-ui/react'
import { supabase } from '../utils/initSupabase'
import { myTheme } from '../theme/theme'
import MainPanel from '../components/Layout/MainPanel'
import Sidebar from '../components/Sidebar'
import FixedPlugin from '../components/FixedPlugin/FixedPlugin'
import Configurator from '../components/Configurator/Configurator'

import routes from './routes'
import { getActiveNavbar, getActiveRoute } from '../utils/sidebarFncs'
import AdminNavbar from '../components/Navbars/AdminNavbar'
import 'tailwindcss/tailwind.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function MyApp({ Component, pageProps }) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fixed, setFixed] = useState(false);
  // const router = useRouter();

  // const [activeRoute, setActiveRoute] = useState();
  // const [activeNavbar, setActiveNavbar] = useState()

  // useEffect(() => {
  //   setActiveRoute(getActiveRoute(routes, router))
  //   setActiveNavbar(getActiveNavbar(routes, router))
  // }, [router, routes])


  return (
    <main className={'dark'}>
      <UserContextProvider>
        <ApolloProvider client={supabase}>
          <ChakraProvider theme={myTheme}>
            <Sidebar
              routes={routes}
              logoText={"SWOLE DASHBOARD"}
              display="none"
              sidebarVariant="opaque"
            />
            <MainPanel
              w={{
                base: "100%",
                xl: "calc(100% - 275px)",
              }}
            >
              <Portal>
                <AdminNavbar
                  onOpen={onOpen}
                  secondary={getActiveNavbar(routes)}
                  fixed={fixed}
                // {...rest}
                />
              </Portal>
              <Portal>
                <FixedPlugin
                  secondary={getActiveNavbar(routes)}
                  fixed={fixed}
                  onOpen={onOpen}
                />
              </Portal>
              <Configurator
                secondary={getActiveNavbar(routes)}
                isOpen={isOpen}
                onClose={onClose}
                isChecked={fixed}
                onSwitch={(value) => {
                  setFixed(value);
                }}
                // onOpaque={() => setSidebarVariant("opaque")}
                // onTransparent={() => setSidebarVariant("transparent")}
              />
              <Component {...pageProps} />
            </MainPanel>
          </ChakraProvider>
        </ApolloProvider>
      </UserContextProvider>
    </main>
  )
}
