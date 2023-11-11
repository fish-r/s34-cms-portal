'use client'

import { MultipleChoice } from "@/app/variables";
import { useMantineTheme, Group, rem, Button, Text, Card, Radio, Progress, SimpleGrid, Grid, Container, Center, Stack, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCounter, useListState } from "@mantine/hooks";
import { IconCircleCheck, IconCircleDot, IconCircleX } from "@tabler/icons-react";
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

// Grade Every Question
export const MCQ_GEQ = (props: any) => {

    const qns:MultipleChoice[] = props.qns;

    // console.log(qns);
  
  // Create initialValues dynamically from the number of questions
  const init: { [key: string]: string } = Array.from({ length: qns.length }, (_, index) => ({ [index]: '' }))
  .reduce((acc, obj) => ({ ...acc, ...obj }), {});;

  const form = useForm({
    initialValues: init
  });

  const [qnIndex, handlers] = useCounter(0, { min: 0, max: qns.length-1 });
  const [completed, setCompleted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const redoQuiz = () => {
    form.reset(); setCompleted(false); handlers.set(0);
  }

  const nextQn = () => {
    setSubmitted(false);
    if (qnIndex >= qns.length-1) {
      setCompleted(true);
    } else {
      handlers.increment();
    }
  }

  const submitQn = () => {
    console.log(qns[qnIndex].answer?.toString() + "; " + form.values[qnIndex]);
    setSubmitted(true);
  }

  return (
    <Container size='sm'>
      {!completed ? <form onSubmit={form.onSubmit((values) => setCompleted(true))}>
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
                  !submitted ? 
                  <Radio p='sm' value={item.value} 
                  key={index} label={item.option}
                  /> :
                  <Flex  key={index} align="center">
                    {
                      (qns[qnIndex].answer?.toString() === index.toString()) ?
                      <IconCircleCheck color="green" /> :
                      (qns[qnIndex].answer?.toString() !== form.values[qnIndex]) && (form.values[qnIndex] === index.toString()) ?
                      <IconCircleX color="red" /> :
                      <IconCircleDot color="lightgray" />
                    }
                    <Text p='sm' size="sm">{item.option}</Text>
                  </Flex>
                )
              })
            }
            </Radio.Group>
          
          <Card.Section withBorder>
            <Grid p='md'>
              <Grid.Col span={9}>
                
              </Grid.Col>
              <Grid.Col span={3}>
                {
                  submitted ? 
                  <Button fullWidth onClick={nextQn}>Next</Button> :
                  <Button fullWidth disabled={form.values[qnIndex.toString()] === ""} onClick={submitQn} color="green">Submit</Button>
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