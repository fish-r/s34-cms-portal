/* Components */
import { Dashboard } from './components/Dashboard/Dashboard'
import { Text } from '@mantine/core'

export default function IndexPage() {
  return (<>
    <Dashboard />
  </>
  )
}

export const metadata = {
  title: 'Dashboard',
}
