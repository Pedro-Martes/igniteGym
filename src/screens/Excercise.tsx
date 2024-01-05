import { Box, Center, HStack, Heading, Icon, Image, ScrollView, Text, VStack, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import BodySvg from '@assets/body.svg'
import SereisSvg from '@assets/series.svg'
import RepeatSvg from '@assets/repetitions.svg'
import { Button } from "@components/button";
import { AppError } from "../util/AppError";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/exerciseDTO";
import { Loading } from "@components/Loading";

type RoutePramsProps = {
    exerciseID: string
}

export function Exercise() {
    const toast = useToast()
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(true)
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
    const { exerciseID } = route.params as RoutePramsProps;
    const Navigation = useNavigation<AppNavigationRoutesProps>()



    async function fetchExerciseByID() {
        try {
            setIsLoading(true)
            const response = await api.get(`/exercises/${exerciseID}`)
            setExercise(response.data)


        } catch (error) {
            console.log('error');
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar o execício.'
            toast.show({
                title,
                placement: 'top',
                backgroundColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }

    }

    function handleGoBack() {
        //ir para a tela anterior
        Navigation.goBack()

    }

    useEffect(() => {
        fetchExerciseByID()
    }, [exerciseID])
    return (
        isLoading
            ? <Loading />

            : <VStack flex={1} >
                {/* Header da tela: */}
                <VStack px={8} bg={'gray.600'} pt={12} >

                    <HStack mt={4} mb={8} alignItems={'center'}>

                        <TouchableOpacity >
                            <Icon
                                as={Feather}
                                name="arrow-left"
                                color={'green.500'}
                                size={6}
                                onPress={handleGoBack}
                            />
                        </TouchableOpacity>
                        <Heading color={'gray.100'} fontSize={'lg'} flexShrink={1} flex={1} ml={2} fontFamily={"heading"}>
                            {exercise.name}
                        </Heading>
                        <HStack alignItems={'center'}>
                            <BodySvg />
                            <Text ml={1} color={'gray.200'} textTransform={'capitalize'}>{exercise.group}</Text>
                        </HStack>
                    </HStack>
                </VStack>

                {/* corpo */}
                <ScrollView showsVerticalScrollIndicator={false} >
                    <VStack p={8}>
                        <Box mb={3} rounded={'lg'} overflow={'hidden'} >

                            <Image
                                w={'full'}
                                h={80}
                                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                                alt="Detalhes do Exercício"
                                resizeMode="cover"
                                rounded={'lg'}
                            />
                        </Box>
                        <Box backgroundColor={'gray.500'} rounded={'md'} pb={4} px={4} mb={96} >
                            <HStack alignItems={'center'} justifyContent={'space-around'} mb={6} mt={5}>

                                <HStack>
                                    <SereisSvg />
                                    <Text ml={2} color={'gray.200'}>{exercise.series} Series</Text>
                                </HStack>

                                <HStack>
                                    <RepeatSvg />
                                    <Text ml={2} color={'gray.200'}>{exercise.repetitions}x Repetições</Text>
                                </HStack>

                            </HStack>
                            <Button
                                title="Marcar como realizada"
                            />

                        </Box>



                    </VStack>

                </ScrollView>

            </VStack >
    )
}