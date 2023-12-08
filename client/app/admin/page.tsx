/* Components */
import { Dashboard } from '../components/admin/Dashboard'
import { Center, Text } from '@mantine/core'

export default function IndexPage() {
  return (<>
    <Center mb='lg'>
      <Text size='xl' >Your Course: PDPA</Text>
    </Center>
    
    <Dashboard />
  </>
  )
}

export const metadata = {
  title: 'Dashboard',
}
