'use client'

import { Group, Button, Text, Anchor, Checkbox, Container, Paper, PasswordInput, TextInput, Title, Center, Stack, Card, Textarea, Grid } from "@mantine/core";
import { MCQ_GEQ } from "../common/MCQ_GEQ";
import { useEffect, useState } from "react";
import { MCQ } from "../common/MCQ";
import Link from "next/link";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";

export const CourseChat = (props: any) => {
  const [current, setCurrent] = useState(0);
  const [display, setDisplay] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [typeDone, setTypeDone] = useState(false);
  const router = useRouter();
  const chat_sequence = props.chat_sequence;

  const displayPrev = () => {
    setDisplay(display-1);
    setTypingIndex(999);
  }
  const displayNext = () => {
    setDisplay(display+1);
    setTypingIndex(999);
  }
  const progress = () => {
    if(display >= chat_sequence.length - 1){
      router.push('/user/courses')
    } else {
      setCurrent(current+1);
      setDisplay(display+1);
      setTypeDone(false);
      setTypingIndex(0);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTypingIndex(typingIndex + 1);

      if(typingIndex >= chat_sequence[display].server.length){
        clearInterval(intervalId);
        setTypeDone(true);
      }
    }, 5)

    return () => clearInterval(intervalId);
  })

  return (
    
    <Container size='sm'>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section withBorder>
            <Grid p='sm' align='center'>
              <Grid.Col span={3}>
                <Button.Group>
                  <Button variant="default" radius='xl' disabled={display <= 0} onClick={displayPrev}> <IconChevronLeft /> </Button>
                  <Button variant="default" radius='xl' disabled={display >= current} onClick={displayNext}> <IconChevronRight/> </Button>
                </Button.Group>
              </Grid.Col>
              <Grid.Col span={6}><Text ta='center'>Course: The Inner Solar System</Text></Grid.Col>
              <Grid.Col span={3}></Grid.Col>
            </Grid>
          </Card.Section>
          <Card.Section withBorder>
            <Group p='lg'>
              <Text fw={500} size="xl">
              {chat_sequence[display].server.slice(0, typingIndex)}
              </Text>
            </Group>
          </Card.Section>{ typeDone && 
          <Card.Section p='lg' withBorder>
          {
            chat_sequence[display].client.type === "chat" ?
            <Grid align="flex-end">
              <Grid.Col span={10}>
                <Textarea autosize placeholder="Write here to answer!" />
              </Grid.Col>
              <Grid.Col span={2}>
                <Button fullWidth onClick={progress}>Send</Button>
              </Grid.Col>
            </Grid>
             :
            chat_sequence[display].client.type === "mcq" ?
            <Grid grow gutter='xs'>
              {
                chat_sequence[display].client.options.map((item:string, index:number) => {
                  return <Grid.Col span={6}><Button variant="light" fullWidth onClick={progress}>{item}</Button></Grid.Col>
                })
              }
            </Grid> :
            <Group justify="center">
              <Button w={200} onClick={progress}>OK</Button>
            </Group>
          }
          </Card.Section>}
        </Card>
    </Container>
  );
}