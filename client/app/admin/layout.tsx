/* Components */
import { Providers } from '@/lib/providers'
import Link from 'next/link'
import '@mantine/core/styles.css';

/* Instruments */
import styles from './styles/layout.module.css'
// import './styles/globals.css'
import { Button, ColorSchemeScript, MantineProvider, Text } from '@mantine/core'
import { Base } from '../components/admin/_Base/Base';

export default function AdminLayout(props: React.PropsWithChildren) {
  return (
    <Base> {props.children} </Base>
  )
}
