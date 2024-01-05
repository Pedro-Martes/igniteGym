import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { UserImage } from "./UserImage";
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";
import  userPhotoDefault from '@assets/userPhotoDefault.png'


export function HomeHeader() {

const {user, signOut} = useAuth();
const image = user.avatar

    return (
        <HStack backgroundColor={'gray.600'} paddingTop={16} paddingBottom={5} px={8} alignItems={"center"} >


            <UserImage
                source={{ uri: user.avatar ? user.avatar : '' }}
                alt="User Photo"
                size={12}


            />

            <VStack flex={1}>
                <Text color={'gray.100'} fontSize={'md'}>Olá,</Text>
                <Heading color={'gray.100'} fontSize={'md'} fontFamily={"heading"}>{user.name}</Heading>
            </VStack>

            <TouchableOpacity onPress={signOut}>

                <Icon
                    as={MaterialIcons}
                    name="logout"
                    size={7}
                    color={'gray.100'}
                />

            </TouchableOpacity>

        </HStack>
    )
}