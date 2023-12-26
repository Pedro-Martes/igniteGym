import { Header } from "@components/Header";
import { UserImage } from "@components/UserImage";
import { Center, FlatList, HStack, Heading, Icon, Skeleton, Text, VStack, useToast } from "native-base";
import { TouchableOpacity, ScrollView, Alert } from "react-native";
import { useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { Input } from "@components/input";
import { Button } from "@components/button";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


export function Profile() {
    const PHOTO_SIZE = 33
    const [photoISLoading, setphotoISLoading] = useState<Boolean>(false)
    const [userPhoto, setUserPhoto] = useState('https://github.com/Pedro-Martes.png')
    const toast = useToast()

    async function handleUserPhotoSelect() {
        setphotoISLoading(true)
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
                


            });


            if (photoSelected.canceled) {
                return;
            }

            if (photoSelected.assets[0].uri) {

                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

                

                if(photoInfo.size && (photoInfo.size / 1024 /1024) > 5 ){

              1     
                    return toast.show({
                        title: "Foto muito grande! Utilize com no máximo 5mb",
                        placement: 'top',
                        bgColor: 'red.500'
                        
                    })
                }

                setUserPhoto(photoSelected.assets[0].uri)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setphotoISLoading(false)
        }
    }




    return (
        <VStack>
            <Header title="Perfil" />

            <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
                <Center mt={6} px={10}>

                    {photoISLoading ?

                        <Skeleton
                            w={PHOTO_SIZE}
                            h={PHOTO_SIZE}
                            rounded={'full'}
                            startColor={'gray.500'}
                            endColor={'gray.400'} />

                        :

                        <UserImage
                            source={{ uri: userPhoto }}
                            alt="User Photo"
                            size={PHOTO_SIZE}
                        />

                    }

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <HStack justifyContent={'center'}>

                            <Icon
                                as={Entypo}
                                name="pencil"
                                size={5}
                            />
                            <Text fontSize={'md'} color='gray.200' mb={8}> Alterar Foto</Text>
                        </HStack>
                    </TouchableOpacity>

                    <Input
                        placeholder="Nome"
                        bg={'gray.500'}
                    />

                    <Input
                        value="exemplo.com.br"
                        isDisabled
                        bg={'gray.500'}
                    />

                </Center>

                <Center px={10} mb={9}>


                    <Heading fontFamily={"heading"} color={'gray.200'} fontSize={'md'} mb={2} mt={12}>Alterar Senha</Heading>
                    <Input
                        bg={'gray.600'}
                        placeholder="Senha Atual"
                        secureTextEntry
                    />

                    <Input
                        bg={'gray.600'}
                        placeholder="Nova Senha"
                        secureTextEntry
                    />

                    <Input
                        bg={'gray.600'}
                        placeholder="Confirmar Senha"
                        secureTextEntry
                    />

                    <Button
                        title="Alterar"
                        mt={4}
                    />

                </Center>
            </ScrollView>
        </VStack>
    )
}