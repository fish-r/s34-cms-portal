'use client'

import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Button, Group, NavLink, Title } from '@mantine/core';
import { IconBinaryTree, IconClipboardList, IconDashboard } from '@tabler/icons-react';
import Link from 'next/link';

export const Base = (props: React.PropsWithChildren) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title>S34 CMS Trailer</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="Dashboard" component={Link} href={'/admin/'} leftSection={<IconDashboard size="1rem" stroke={1.5} />} />
        <NavLink label="Generate Questions" component={Link} href={'/admin/generateqns'} leftSection={<IconClipboardList size="1rem" stroke={1.5} />} />
        <NavLink label="Storyline Editor" component={Link} href={'/admin/storylineeditor'} leftSection={<IconBinaryTree size="1rem" stroke={1.5} />} />
      </AppShell.Navbar>

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
}