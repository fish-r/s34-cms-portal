'use client'

import { useMantineTheme, Group, rem, Button, Text, Card, Radio, Progress, SimpleGrid, Grid, Container, Center, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCounter, useListState } from "@mantine/hooks";
import { useState } from "react";

const qns = [
  {
    question: "When I need to learn...",
    options: [
      { option: "I like to see how I feel about it first", element: 'CE' },
      { option: "I like to just start, do it", element: 'AE' },
      { option: "I like to think about why", element: 'AC' },
      { option: "I like to watch and listen before I do it", element: 'RO' },
    ]
  },
  {
    question: "I learn best when...",
    options: [
      { option: "I just trust my hunches and feelings", element: 'CE' },
      { option: "I work hard to get things done", element: 'AE' },
      { option: "I rely on logical thinking", element: 'AC' },
      { option: "I listen and watch carefully", element: 'RO' },
    ]
  },
  {
    question: "When I am learning...",
    options: [
      { option: "I have feelings and reactions", element: 'CE' },
      { option: "I am usually the one responsible", element: 'AE' },
      { option: "I tend to reason things out first", element: 'AC' },
      { option: "I am quiet and reserved until comfortable", element: 'RO' },
    ]
  },
  {
    question: "I learn by...",
    options: [
      { option: "Feeling", element: 'CE' },
      { option: "Doing", element: 'AE' },
      { option: "Thinking", element: 'AC' },
      { option: "Watching", element: 'RO' },
    ]
  },
  {
    question: "When I learn...",
    options: [
      { option: "I get involved", element: 'CE' },
      { option: "I am active", element: 'AE' },
      { option: "I evaluate things", element: 'AC' },
      { option: "I observe", element: 'RO' },
    ]
  },
]

export const Profile = (props: React.PropsWithChildren) => {
  
  const form = useForm({
    initialValues:{
      0: '', 1: '', 2: '', 3: '', 4: '',
    }
  })
  const [qnIndex, handlers] = useCounter(0, { min: 0, max: qns.length-1 });
  const [submitted, setSubmitted] = useState(false);

  const redoQuiz = () => {
    form.reset(); setSubmitted(false); handlers.set(0);
  }

  return (
    <Container size='sm'>
      {!submitted ? <form onSubmit={form.onSubmit((values) => setSubmitted(true))}>
        <Progress value={qnIndex/(qns.length-1)*100} mb='md' />
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section withBorder>
            <Group p='md'>
              <Text fw={500}>{qns[qnIndex].question}</Text>
            </Group>
          </Card.Section>
          
            <Radio.Group py='sm' {...form.getInputProps(qnIndex.toString())} >
            {
              qns[qnIndex].options.map((item, index) => {
                return (
                  <Radio p='sm' value={item.element} 
                  key={index} label={item.option}
                  />
                )
              })
            }
            </Radio.Group>
          
          <Card.Section withBorder>
            <Grid p='md'>
              <Grid.Col span={3}>
                <Button fullWidth variant="light" disabled={qnIndex==0} onClick={handlers.decrement}>Previous</Button>
              </Grid.Col>
              <Grid.Col span={6}>
                
              </Grid.Col>
              <Grid.Col span={3}>
                {
                  qnIndex < qns.length-1 ? 
                  <Button fullWidth variant="light" onClick={handlers.increment}>Next</Button> :
                  <Button fullWidth disabled={form.values["4"] === ""} color="green" type="submit">Submit</Button>
                }
              </Grid.Col>
            </Grid>
          </Card.Section>
        </Card>
      </form> : 
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack align="center" p='lg'>
          <Text fw='bold' size="xl">Thank you for completing the questionnaire!</Text>
          <Button onClick={redoQuiz}>Redo</Button>
        </Stack>
      </Card>
      }
    </Container>
  )
}