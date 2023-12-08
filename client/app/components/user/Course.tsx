'use client'

import { Group, Button, Text, Anchor, Checkbox, Container, Paper, PasswordInput, TextInput, Title, Center, Stack } from "@mantine/core";
import { MCQ_GEQ } from "../common/MCQ_GEQ";
import { useState } from "react";
import { MCQ } from "../common/MCQ";
import Link from "next/link";

export const Course = (props: any) => {
  const [phase, setPhase] = useState(0);
  const formative_qns = props.formative_qns;
  const summative_qns = props.summative_qns;

  return (
      phase == 0 ?
        <MCQ_GEQ qns={formative_qns}>
          <Stack align="center" p='lg'>
            <Text fw='bold' size="xl">Are you ready to do the test?</Text>
            <Button onClick={() => setPhase(1)}>Yes</Button>
          </Stack>
        </MCQ_GEQ> :
      phase == 1 ?
        <MCQ qns={summative_qns}>
          <Stack align="center" p='lg'>
            <Text fw='bold' size="xl">Congratulations on finishing the course!</Text>
            <Text fw={200} c='dark.3' fz={48}>You scored: 3/4!</Text>
            <Button component={Link} href="/user/courses/">Return</Button>
          </Stack>
        </MCQ> :
      <></>
  )
}