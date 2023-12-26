import { Center, FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ExerciseCard } from "@components/ExerciseCard";
import { HomeHeader } from "@components/homeHHeader";
import { Groups } from "@components/group";
import { useState } from "react";
import { AppNavigationRoutesProps } from "@routes/app.routes";

export function Home() {

    const [groupSelected, setGroupSelected] = useState('Costa')
    const [groups, setGroups] = useState(['Costa', 'Biceps', 'Triceps', 'Ombro'])
    const [exercise, setExercise] = useState(['1', '2', '3', '4', '5'])

    const navigation = useNavigation<AppNavigationRoutesProps>()
    function handleOpenExerciseDetails() {
        navigation.navigate('Exercise');
    }




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
            <VStack flex={1} px={8}>

                <HStack justifyContent={'space-between'} marginBottom={5}>
                    <Heading color={'gray.200'} fontSize={'md'} onPress={handleOpenExerciseDetails} fontFamily={"heading"}> Exercício</Heading>
                    <VStack backgroundColor={'gray.500'} paddingLeft={2} paddingRight={2} rounded={'full'} >
                        <Text color={'gray.300'} fontSize={'sm'} > {exercise.length} </Text>
                    </VStack>
                </HStack>


                <FlatList
                    data={exercise}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <ExerciseCard
                            onPress={handleOpenExerciseDetails}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ paddingBottom: 10 }}

                />



            </VStack>
        </VStack>

    )
}