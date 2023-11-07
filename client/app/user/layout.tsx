/* Components */
import { Providers } from '@/lib/providers'
import Link from 'next/link'
import '@mantine/core/styles.css';

/* Instruments */
// import './styles/globals.css'
import { Button, ColorSchemeScript, MantineProvider, Text } from '@mantine/core'
import { UserBase } from '../components/user/_UserBase/Base';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    // For Redux
    <Providers>
      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <body>
          <MantineProvider defaultColorScheme='light'> {/* For Mantine UI library */}
            <UserBase> {props.children} </UserBase>
          </MantineProvider>
        </body>
      </html>
    </Providers>
  )
}
