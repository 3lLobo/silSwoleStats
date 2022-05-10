// pages/_document.js

import { ColorModeScript } from '@chakra-ui/react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { myTheme } from '/theme/theme'


class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <ColorModeScript initialColorMode={myTheme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
