'use client'

import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Button, Group, NavLink, Title } from '@mantine/core';
import { IconBinaryTree, IconClipboardList, IconDashboard } from '@tabler/icons-react';
import Link from 'next/link';
import { NAME } from '@/app/variables';

export const UserBase = (props: React.PropsWithChildren) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title>{NAME} Trainee</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="Home" component={Link} href={'/user/'} leftSection={<IconDashboard size="1rem" stroke={1.5} />} />
        <NavLink label="Courses" component={Link} href={'/user/courses'} leftSection={<IconClipboardList size="1rem" stroke={1.5} />} />
        <NavLink label="Profile" component={Link} href={'/user/profile'} leftSection={<IconBinaryTree size="1rem" stroke={1.5} />} />
      </AppShell.Navbar>

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
}