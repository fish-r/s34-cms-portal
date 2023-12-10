'use client'

import { useMantineTheme, Group, rem, Button, Text, Image, Stack } from "@mantine/core";

export const StorylineEditor = (props: React.PropsWithChildren) => {
    return (
    <Stack align="center">
        <Text fw='bold'>PDPA Training Storyline</Text>
        <Image w={480} src="/storylineeditor.drawio.svg" />
    </Stack>
  )
}