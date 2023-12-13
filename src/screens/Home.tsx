import { ExerciseCard } from "@components/ExerciseCard";
import { Groups } from "@components/group";
import { HomeHeader } from "@components/homeHHeader";
import { Center, FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useState } from "react";

export function Home() {

    const [groupSelected, setGroupSelected] = useState('Costa')
    const [groups, setGroups] = useState(['Costa', 'Biceps', 'Triceps', 'Ombro'])
    const [exercise, setExercise] = useState(['1', '2', '3', '4','5'])

    return (


        <VStack flex={1} >
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Groups
                        name={item}
                        isActive={  groupSelected.toLocaleLowerCase() === item.toLocaleLowerCase( )}
                        onPress={() => setGroupSelected(item)}
                    />
                )}

                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                marginY={10}
                maxHeight={10}
            />
            <VStack flex={1} px={8}>

                <HStack justifyContent={'space-between'} marginBottom={5}>
                    <Heading color={'gray.200'} fontSize={'md'} > Exercício</Heading>
                    <VStack backgroundColor={'gray.500'} paddingLeft={2} paddingRight={2} rounded={'full'} >
                        <Text color={'gray.300'} fontSize={'sm'} > {exercise.length} </Text>
                    </VStack>
                </HStack>


                <FlatList
                data={exercise}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <ExerciseCard
                        key={item}
                    />
                )}
                showsVerticalScrollIndicator={false}
                _contentContainerStyle={{paddingBottom: 10}}

                />



            </VStack>
        </VStack>

    )
}