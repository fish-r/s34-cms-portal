'use client'

import { useMantineTheme, Group, rem, Button, Text, Card, Radio, Progress, SimpleGrid, Grid, Container, Center, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCounter, useListState } from "@mantine/hooks";
import { useState } from "react";
import { MCQ } from "../../common/MCQ/MCQ";

const qns = [
  {
    question: "When I need to learn...",
    options: [
      { option: "I like to see how I feel about it first", value: 'CE' },
      { option: "I like to just start, do it", value: 'AE' },
      { option: "I like to think about why", value: 'AC' },
      { option: "I like to watch and listen before I do it", value: 'RO' },
    ]
  },
  {
    question: "I learn best when...",
    options: [
      { option: "I just trust my hunches and feelings", value: 'CE' },
      { option: "I work hard to get things done", value: 'AE' },
      { option: "I rely on logical thinking", value: 'AC' },
      { option: "I listen and watch carefully", value: 'RO' },
    ]
  },
  {
    question: "When I am learning...",
    options: [
      { option: "I have feelings and reactions", value: 'CE' },
      { option: "I am usually the one responsible", value: 'AE' },
      { option: "I tend to reason things out first", value: 'AC' },
      { option: "I am quiet and reserved until comfortable", value: 'RO' },
    ]
  },
  {
    question: "I learn by...",
    options: [
      { option: "Feeling", value: 'CE' },
      { option: "Doing", value: 'AE' },
      { option: "Thinking", value: 'AC' },
      { option: "Watching", value: 'RO' },
    ]
  },
  {
    question: "When I learn...",
    options: [
      { option: "I get involved", value: 'CE' },
      { option: "I am active", value: 'AE' },
      { option: "I evaluate things", value: 'AC' },
      { option: "I observe", value: 'RO' },
    ]
  },
]

export const Profile = (props: React.PropsWithChildren) => {
  
  return <MCQ qns={qns} />
}