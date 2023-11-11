import { MCQ } from "@/app/components/common/MCQ";
import { MCQ_GEQ } from "@/app/components/common/MCQ_GEQ";
import { useMantineTheme, Group, rem, Button, Text, Container, Stack, Progress, Box, Center } from "@mantine/core";

async function getFormativeCourseData() {
    const res = await fetch("http://localhost:3000/pdpa_qns_formative.json", { cache: 'no-store' });
    if(!res.ok){ throw new Error('Failed to fetch data') }
    return res.json();
}

async function getSummativeCourseData() {
    const res = await fetch("http://localhost:3000/pdpa_qns_summative.json", { cache: 'no-store' });
    if(!res.ok){ throw new Error('Failed to fetch data') }
    return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {

    const formative_qns = await getFormativeCourseData();
    // const summative_qns = await getSummativeCourseData();

    return (
        <>
            <Center mb='lg'><Text size="xl" fw='bold'>Course: PDPA</Text></Center>
            
            <MCQ_GEQ qns={formative_qns} />
        </>
    )
}