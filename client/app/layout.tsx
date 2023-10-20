/* Components */
import { Providers } from '@/lib/providers'
import Link from 'next/link'
import '@mantine/core/styles.css';
import { Nav } from './components/template/Nav'

/* Instruments */
import styles from './styles/layout.module.css'
// import './styles/globals.css'
import { Button, ColorSchemeScript, MantineProvider, Text } from '@mantine/core'
import { Base } from './components/_Base/Base';

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
            <Base> {props.children} </Base>
          </MantineProvider>
        </body>
      </html>
    </Providers>
  )
}
