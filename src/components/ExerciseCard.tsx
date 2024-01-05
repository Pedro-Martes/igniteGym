import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import {Entypo} from '@expo/vector-icons'
import { ExerciseDTO } from "@dtos/exerciseDTO";
import { api } from "@services/api";

type Props = TouchableOpacityProps & {
ExerciseData: ExerciseDTO
};

export function ExerciseCard({ExerciseData, ...rest}: Props) {
    return (
        <TouchableOpacity {...rest}>
            <HStack backgroundColor={"gray.500"} alignItems={'center'}  padding={2} pr={4} rounded={'md'} mb={3}>
                <Image
                source={{uri: `${api.defaults.baseURL}/exercise/thumb/${ExerciseData.thumb}`}}
                alt="Excise Image"
                w={20}
                h={20}
                rounded={'md'}
                resizeMode="cover"
                />
                <VStack   flex={1} ml={2}>
                    <Heading fontSize={'lg'} color={'gray.100'} fontFamily={"heading"}>{ExerciseData.name}</Heading>
                    <Text fontSize={'sm'} color={'gray.200'} numberOfLines={2} mt={1}>{ExerciseData.series} séries x {ExerciseData.repetitions} repetições</Text>
                </VStack>

                <Icon
                as={Entypo}
                name="chevron-thin-right"
                color={'gray.300'}
                />
            </HStack>

        </TouchableOpacity>
    )
}