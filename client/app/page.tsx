import { Group, Button, Text, Anchor, Checkbox, Container, Paper, PasswordInput, TextInput, Title } from "@mantine/core";
import { NAME } from "./variables";

export default function IndexPage() {
    return (
      <>
        <Container size={420} my={40}>
            <Title ta="center">
                Log In
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" placeholder="you@mantine.dev" required />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                <Group justify="space-between" mt="lg">
                <Checkbox label="Remember me" />
                <Anchor component="button" size="sm">
                    Forgot password?
                </Anchor>
                </Group>
                <Button fullWidth mt="xl">
                Sign in
                </Button>
            </Paper>
            </Container>
      </>
  )
}

export const metadata = {
    title: NAME,
}  