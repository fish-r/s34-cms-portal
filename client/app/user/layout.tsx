/* Components */
import { Providers } from '@/lib/providers'
import Link from 'next/link'
import '@mantine/core/styles.css';

/* Instruments */
// import './styles/globals.css'
import { Button, ColorSchemeScript, MantineProvider, Text } from '@mantine/core'
import { UserBase } from '../components/user/_UserBase/Base';

export default function UserLayout(props: React.PropsWithChildren) {
  return (
    <UserBase> {props.children} </UserBase>
  )
}
