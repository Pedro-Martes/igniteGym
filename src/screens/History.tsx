
import { Header } from "@components/Header";
import { HistoryCard } from "@components/HistoryCard";
import { Center, Heading, SectionList, Text, VStack } from "native-base";
import { useState } from 'react'

export function History() {

    const [Exercise, setExecise] = useState([
        {
            title: '12/12/2023',
            data: ['1', '3', '2']
        },
        {
            title: '11/12/2023',
            data: ['1', '3']
        },
    ])


    return (
        <VStack flex={1} >
            <Header
                title="Histórico de exercícios"
            />
            <SectionList
                sections={Exercise}
                keyExtractor={item => item}
                renderItem={({ item }) => <HistoryCard />}
                renderSectionHeader={({ section }) => (
                    <Heading color={'gray.200'} fontSize={'md'} mt={10} mb={3} fontFamily={"heading"}>{section.title}</Heading>
                )}
                contentContainerStyle={Exercise.length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' }}
                ListEmptyComponent={() => (
                    <Text color={'gray.200'} alignItems={'center'} textAlign={'center'}>
                        Ainda não exercícios Registrados.
                        {'\n'}
                        Comece ja seu treino !
                    </Text>
                )}

                px={3}


            />


        </VStack>
    )
}