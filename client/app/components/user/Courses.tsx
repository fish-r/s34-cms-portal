'use client'

import { useMantineTheme, Group, rem, Button, Text, Checkbox, Table } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

const data = [
  { id:'1', name: "Course 1", instructor: "A", start: "1/1/2023", end: "1/1/2024", state:"start" },
  { id:'2', name: "Course 2", instructor: "B", start: "1/1/2023", end: "1/1/2024", state:"continue" },
  { id:'3', name: "Course 3", instructor: "C", start: "1/1/2023", end: "1/1/2024", state:"start" },
]

export const Courses = (props: React.PropsWithChildren) => {
  const [selection, setSelection] = useState<string[]>([]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr key={item.id}>
        <Table.Td>
          <Checkbox checked={selection.includes(item.id)} onChange={() => toggleRow(item.id)} />
        </Table.Td>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>{item.instructor}</Table.Td>
        <Table.Td>{item.start}</Table.Td>
        <Table.Td>{item.end}</Table.Td>
        <Table.Td>{ item.state == "start" ? <Button component={Link} fullWidth color="green" href={"/user/courses/"+item.id}>Start</Button> : item.state == "continue" ? <Button fullWidth component={Link} href={"/user/courses/"+item.id}>Continue</Button> : ''}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
              />
            </Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Instructor</Table.Th>
            <Table.Th>Start</Table.Th>
            <Table.Th>End</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}