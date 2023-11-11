'use client'

import { MultipleChoice } from "@/app/variables";
import { useMantineTheme, Group, rem, Button, Text, Card, Radio, Progress, SimpleGrid, Grid, Container, Center, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCounter, useListState } from "@mantine/hooks";
import { useState } from "react";

// QUESTIONS ARRAY FORMAT:
// const qns = [
//   {
//     question: "When I need to learn...",
//     options: [
//       { option: "I like to see how I feel about it first", value: 'CE' },
//       { option: "I like to just start, do it", value: 'AE' },
//       { option: "I like to think about why", value: 'AC' },
//       { option: "I like to watch and listen before I do it", value: 'RO' },
//     ]
//   },
//   ...
// ]

export const MCQ = (props: any) => {

    const qns:MultipleChoice[] = props.qns;

    // console.log(qns);
  
  // Create initialValues dynamically from the number of questions
  const init: { [key: string]: string } = Array.from({ length: qns.length }, (_, index) => ({ [index]: '' }))
  .reduce((acc, obj) => ({ ...acc, ...obj }), {});;

  const form = useForm({
    initialValues: init
  });

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
                  <Radio p='sm' value={item.value} 
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
                  <Button fullWidth disabled={form.values[qnIndex.toString()] === ""} onClick={handlers.increment}>Next</Button> :
                  <Button fullWidth disabled={form.values[(qns.length-1).toString()] === ""} color="green" type="submit">Submit</Button>
                }
              </Grid.Col>
            </Grid>
          </Card.Section>
        </Card>
      </form> : 
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {props.children}
      </Card>
      }
    </Container>
  )
}