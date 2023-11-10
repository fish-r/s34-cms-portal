'use client'

import { useMantineTheme, Group, rem, Button, Text, Container, Stack, Progress, Box, Center } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconDownload, IconX, IconCloudUpload, IconCircleCheck } from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";
import classes from './UploadPdf.module.css';
import { useInterval, useTimeout } from "@mantine/hooks";

export const UploadPdf = (props: React.PropsWithChildren) => {
    const theme = useMantineTheme();
    const [progress, setProgress] = useState(0);
    const interval = useInterval(() => setProgress((s) => s + 1), 50);
    const [phase, setPhase] = useState(0); // 0 - Idle; 1 - Processing; 2 - Complete
    const { start, clear } = useTimeout(() => setPhase(2), 1000 * 5);
    const openRef = useRef<() => void>(null);

    return (
      <Container size='sm'>
        {
          phase == 0 ? <div className={classes.wrapper}>
              <Dropzone
                  openRef={openRef}
                  onDrop={() => {console.log("ACCEPTED"); setPhase(1); setProgress(0); interval.start(); clear(); start();}}
                  className={classes.dropzone}
                  radius="md"
                  accept={[MIME_TYPES.pdf]}
                  maxSize={30 * 1024 ** 2}
              >
              <div style={{ pointerEvents: 'none' }}>
                <Group justify="center">
                  <Dropzone.Accept>
                    <IconDownload
                      style={{ width: rem(50), height: rem(50) }}
                      color={theme.colors.blue[6]}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{ width: rem(50), height: rem(50) }}
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                  </Dropzone.Idle>
                </Group>

                <Text ta="center" fw={700} fz="lg" mt="xl">
                  <Dropzone.Accept>Drop files here</Dropzone.Accept>
                  <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                  <Dropzone.Idle>Upload your file</Dropzone.Idle>
                </Text>
                <Text ta="center" fz="sm" mt="xs" c="dimmed">
                  Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
                  are less than 30mb in size.
                </Text>
              </div>
            </Dropzone>

            <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
              Select files
            </Button>
          </div> : phase == 1 ?
          <Stack>
            <Center><Text size='lg'>Your training material is being processed. Please wait.</Text></Center>
            <Progress striped animated value={progress} size='xl' radius='xl' />
          </Stack> :
          <Stack align="center">
            <Text size='lg' >Your training material has been processed!</Text>
            <IconCircleCheck
                      size={100}
                      color='green'
                      stroke={1.5}
              />
            <Button onClick={() => setPhase(0)}>Upload new file?</Button>
          </Stack>
        }
       
    </Container>
  )
}