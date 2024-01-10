import { Header } from "@components/Header";
import { UserImage } from "@components/UserImage";
import { Center, FlatList, HStack, Heading, Icon, Skeleton, Text, VStack, useToast } from "native-base";
import { TouchableOpacity, ScrollView, Alert } from "react-native";
import { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import { Input } from "@components/input";
import { Button } from "@components/button";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "../util/AppError";


type FormDataProps = {
    name: string
    password: string
    email: string
    old_password: string
    confirm_password: string
}

const ProfileSchema = yup.object({
    name: yup.string().min(3, 'Insira no mínimo 2 caracteres.').required('Campo Obrigatório'),
    password: yup.string().min(6, 'Senha deve conter no mínimo 6 caracteres').nullable().transform((value) => !!value ? value : null),

    confirm_password: yup
        .string()
        .nullable()
        .transform((value) => !!value ? value : null)
        .oneOf([yup.ref('password'), null], 'Senhas não são compatíveis.')
        .when('password', {
            is: (Field: any) => Field,
            then: (schema) => schema.nullable().required('Campo Obrigatório.').transform((value) => !!value ? value : null)
        }),
})

export function Profile() {
    const PHOTO_SIZE = 33
    const [photoISLoading, setphotoISLoading] = useState<Boolean>(false)
    const [isLoading, setIsLoading] = useState(false)
    const [uriAvatar, setUriAvatar] = useState('')
    const toast = useToast()
    const { user, updateUserProfile } = useAuth()
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(ProfileSchema),
        defaultValues: {
            name: user.name,
            email: user.email
        },
    })


    function updateAvatarImage() {
        if (user.avatar) {
            setUriAvatar(`${api.defaults.baseURL}/avatar/${user.avatar}`)
        } else {
            setUriAvatar(`https://picsum.photos/200`)
        }
    }

    useEffect(() => {
        updateAvatarImage()
    }, [])

    async function handleUserPhotoSelect() {
        setphotoISLoading(true)
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true
            });


            if (photoSelected.canceled) {
                return;
            }

            if (photoSelected.assets[0].uri) {

                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

                if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {

                    return toast.show({
                        title: "Foto muito grande! Utilize com no máximo 5mb",
                        placement: 'top',
                        bgColor: 'red.500'

                    })
                }

                const fileExtension = photoSelected.assets[0].uri.split('.').pop()
                
                const photoFile = {
                    name: `${user.id}${user.name}.${fileExtension}`.toLowerCase(),
                    uri: photoSelected.assets[0].uri,
                    type: `${photoSelected.assets[0].type}/${fileExtension}`

                } as any;

                const userPhotoUploadForm = new FormData();
                userPhotoUploadForm.append('avatar', photoFile)
                console.log(userPhotoUploadForm);

                const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
                    headers: {
                        'Content-Type': `multipart/form-data;`
                    }
                })

                const userUpdated = user
                userUpdated.avatar = avatarUpdatedResponse.data.avatar;
                updateUserProfile(userUpdated)

                toast.show({
                    title: "Foto atualizada com sucesso!",
                    placement: 'top',
                    bgColor: 'green.500',

                })

                setUriAvatar(photoSelected.assets[0].uri)

            }
        } catch (error) {
            console.log(error);
        } finally {
            setphotoISLoading(false)
        }
    }

    async function handleProfileUpdate(data: FormDataProps) {
        try {
            setIsLoading(true)
            const userUpdated = user
            userUpdated.name = data.name
            await api.put('/users', data)

            await updateUserProfile(userUpdated)

            toast.show({
                title: "Perfil atualizado com sucesso!",
                placement: 'top',
                bgColor: 'green.500',
                duration: 2000

            })

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível atualizar o perfil.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
                duration: 500
            })


        } finally {
            setIsLoading(false)
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
                            source={{ uri: `${uriAvatar}` }}
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

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { value, onChange } }) => (

                            <Input
                                placeholder="Nome"
                                bg={'gray.500'}
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    >

                    </Controller>


                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { value, onChange } }) => (

                            <Input
                                placeholder="Email"
                                bg={'gray.500'}
                                onChangeText={onChange}
                                value={value}
                                isDisabled
                            />
                        )}
                    >

                    </Controller>



                </Center>

                <Center px={10} mb={9}>


                    <Heading fontFamily={"heading"} color={'gray.200'} fontSize={'md'} mb={2} mt={12}>Alterar Senha</Heading>

                    <Controller
                        control={control}
                        name="old_password"
                        render={({ field: { onChange } }) => (

                            <Input
                                bg={'gray.600'}
                                placeholder="Senha Atual"
                                secureTextEntry
                                onChangeText={onChange}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange } }) => (

                            <Input
                                bg={'gray.600'}
                                placeholder="Confirmar Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />


                    <Controller
                        control={control}
                        name="confirm_password"
                        render={({ field: { onChange } }) => (


                            <Input
                                bg={'gray.600'}
                                placeholder="Confirmar Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                errorMessage={errors.confirm_password?.message}
                            />
                        )}
                    />




                    <Button
                        title="Alterar"
                        mt={4}
                        onPress={handleSubmit(handleProfileUpdate)}
                        isLoading={isLoading}
                    />

                </Center>
            </ScrollView>
        </VStack>
    )
}