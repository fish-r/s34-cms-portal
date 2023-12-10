'use client'

import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight, IconCoin, IconDashboard, IconDiscount2, IconMoodHappy, IconReceipt2, IconStar, IconUserCheck, IconUserPlus, IconUsers } from '@tabler/icons-react';

export const Dashboard = (props: React.PropsWithChildren) => {
  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Enrolled
          </Text>
          <IconUsers size="1.4rem" stroke={1.5} />
        </Group>
        <Group align="flex-end">
          <Text size='2em' fw={600}>141</Text>
        </Group>
      </Paper>
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Completed
          </Text>
          <IconUserCheck size="1.4rem" stroke={1.5} />
        </Group>
        <Group align="flex-end">
          <Text size='2em' fw={600}>86</Text>
        </Group>
      </Paper>
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Avg. Performance
          </Text>
          <IconStar size="1.4rem" stroke={1.5} />
        </Group>
        <Group align="flex-end">
          <Text size='2em' fw={600}>78%</Text>
        </Group>
      </Paper>
      <Paper withBorder p="md" radius="md">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Satisfaction
          </Text>
          <IconMoodHappy size="1.4rem" stroke={1.5} />
        </Group>
        <Group align="flex-end">
          <Text size='2em' fw={600}>84%</Text>
        </Group>
      </Paper>

    </SimpleGrid>
  );
}