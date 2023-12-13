import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import {Entypo} from '@expo/vector-icons'

type Props = TouchableOpacityProps & {

};

export function ExerciseCard({...rest}: Props) {
    return (
        <TouchableOpacity>
            <HStack backgroundColor={"gray.500"} alignItems={'center'}  padding={2} pr={4} rounded={'md'} mb={3}>
                <Image
                source={{uri: 'https://th.bing.com/th/id/OIG.wwgsmEE0FAjuG4kuoO0y?w=1024&h=1024&rs=1&pid=ImgDetMain'}}
                alt="Excise Image"
                w={20}
                h={20}
                rounded={'md'}
                resizeMode="center"
                />
                <VStack   flex={1} ml={2}>
                    <Heading fontSize={'lg'} color={'gray.100'}>Biceps Pikachu</Heading>
                    <Text fontSize={'sm'} color={'gray.200'} numberOfLines={2} mt={1}>3 séries x 12 repetições6</Text>
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