import { Center, FlatList, HStack, Heading, Text, VStack, useToast } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ExerciseCard } from "@components/ExerciseCard";
import { HomeHeader } from "@components/homeHHeader";
import { Groups } from "@components/group";
import { useCallback, useEffect, useState } from "react";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import { AppError } from "../util/AppError";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/exerciseDTO";
import { Loading } from "@components/Loading";

export function Home() {

    const [groupSelected, setGroupSelected] = useState('antebraço')
    const [groups, setGroups] = useState<string[]>([])
    const [exercise, setExercise] = useState<ExerciseDTO[]>([])
    const [isLoading, setIsLoading] = useState<Boolean>(true)

    const navigation = useNavigation<AppNavigationRoutesProps>()
    const toast = useToast()


    function handleOpenExerciseDetails(exerciseID: string) {
        navigation.navigate('Exercise', { exerciseID });
    }

    async function fetchGroups() {
        try {

            const response = await api.get('/groups');
            setGroups(response.data)

        } catch (error) {
            console.log(error);
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os grupos.'
            toast.show({
                title,
                placement: 'top',
                backgroundColor: 'red.500'
            })
        }
    }

    async function fetchExerciseByGroup() {

        try {
            setIsLoading(true)
            const response = await api.get(`/exercises/bygroup/${groupSelected}`)
            setExercise(response.data)

        } catch (error) {
            console.log(error);
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os execícios.'
            toast.show({
                title,
                placement: 'top',
                backgroundColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        fetchGroups();
        console.log(groupSelected);
    }, [])

    useFocusEffect(useCallback(() => {
        fetchExerciseByGroup();
    }, [groupSelected]))

    return (


        <VStack flex={1} >
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Groups
                        name={item}
                        isActive={groupSelected.toLocaleLowerCase() === item.toLocaleLowerCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}

                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                marginY={10}
                maxHeight={10}
                minH={10}
            />
            {isLoading ? <Loading />
                :
                <VStack flex={1} px={8}>

                    <HStack justifyContent={'space-between'} marginBottom={5}>

                        <Heading
                            color={'gray.200'}
                            fontSize={'md'}
                            fontFamily={"heading"}
                        >
                            Exercício
                        </Heading>

                        <VStack backgroundColor={'gray.500'} paddingLeft={2} paddingRight={2} rounded={'full'} >
                            <Text color={'gray.300'} fontSize={'sm'} > {exercise.length} </Text>
                        </VStack>

                    </HStack>

                    <FlatList
                        data={exercise}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <ExerciseCard
                                onPress={() => handleOpenExerciseDetails(item.id)}
                                ExerciseData={item}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{ paddingBottom: 10 }}

                    />



                </VStack>
            }
        </VStack >

    )
}