import { MCQ } from "@/app/components/common/MCQ";
import { useMantineTheme, Group, rem, Button, Text, Container, Stack, Progress, Box, Center } from "@mantine/core";

async function getCourseData() {
    const res = await fetch("http://localhost:3000/pdpa_qns.json", { cache: 'no-store' });

    if(!res.ok){
        throw new Error('Failed to fetch data')
    }

    return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {

    const data = await getCourseData();

    return (
        <>
            <Text size="xl" fw='bold'>Course: PDPA</Text>
            <MCQ qns={data} />
        </>
    )
}