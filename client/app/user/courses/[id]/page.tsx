import { MCQ } from "@/app/components/common/MCQ";
import { MCQ_GEQ } from "@/app/components/common/MCQ_GEQ";
import { Course } from "@/app/components/user/Course";
import { CourseChat } from "@/app/components/user/CourseChat";
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

async function getChatSequence() {
    const res = await fetch("http://localhost:3000/chatbased_course.json", { cache: 'no-store' });
    if(!res.ok){ throw new Error('Failed to fetch data') }
    return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {

    if(params.id === "4"){
        const chat_sequence = await getChatSequence();

        return (
            <CourseChat chat_sequence={chat_sequence} />
        )
    } else {
        const formative_qns = await getFormativeCourseData();
        const summative_qns = await getSummativeCourseData();

        return (
            <>
                <Center mb='lg'><Text size="xl" fw='bold'>Course: PDPA</Text></Center>
                
                <Course formative_qns={formative_qns} summative_qns={summative_qns} />
            </>
        )
    }
}