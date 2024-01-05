
import { Header } from "@components/Header";
import { HistoryCard } from "@components/HistoryCard";
import { Center, Heading, SectionList, Text, VStack, useToast } from "native-base";
import { useCallback, useState } from 'react'
import { AppError } from "../util/AppError";
import { api } from "@services/api";
import { useFocusEffect } from "@react-navigation/native";
import { HistoryByGroupDTO } from "@dtos/historyGroupDTO";



export function History() {

    const [Exercise, setExercise] = useState<HistoryByGroupDTO[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const toast = useToast()

    async function fetchHistory() {
        try {
            setIsLoading(true)
            const response = await api.get('/history')
            setExercise(response.data)

            
        } catch (error) {
            console.log('error');
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar o histórico.'
            toast.show({
                title,
                placement: 'top',
                backgroundColor: 'red.500',
                duration: 5000,

            })
        } finally{
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchHistory();
    }, []))



    return (
        <VStack flex={1} >
            <Header
                title="Histórico de exercícios"
            />
            <SectionList
                sections={Exercise}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <HistoryCard data={item}/>}
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