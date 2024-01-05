import { Text, VStack, Image, Center, Heading, ScrollView, useToast } from "native-base"
import BackgroundImg from '../assets/background.png'
import LogoSvg from '../assets/logo.svg'
import { Input } from "@components/input"
import { Button } from "@components/button"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '@services/api'
import axios from "axios"
import { Alert } from "react-native"
import { AppError } from "../util/AppError"
import { useAuth } from "@hooks/useAuth"


type FormDataProps = {
    email: string;
    password: string;
    name: string;
    password_confirm: string;
}

const signupSchema = yup.object({
    email: yup.string().email('Email invalido').required('Campo Obrigatório'),
    password: yup.string().min(6, 'Senha deve conter no mínimo 6 caracteres').required('Campo Obrigatório'),
    name: yup.string().min(3, 'Insira no mínimo 2 caracteres.').required('Campo Obrigatório'),
    password_confirm: yup.string().required('Campo Obrigatório').oneOf([yup.ref('password')], 'Confirmação de senha não compatível.')

})

export function Signup() {

    const [isLoading, setIsLoading] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataProps>({
        resolver: yupResolver(signupSchema)
    })

    const toast = useToast();
    const {signIn}= useAuth()

    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleLoginAccount() {
        navigation.navigate('Signin')
    }

    async function handleSignUp({ email, name, password }: FormDataProps) {
        try {
            setIsLoading(true)
            await api.post('/users', { email, name, password })
            await signIn(email, password)


        } catch (error) {
            setIsLoading(false)
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível realizar o cadastro, tente novamente mais tarde.'
            toast.show({
                title,
                variant: "solid",
                description: "Use um email diferente",
                placement: 'top',
                bgColor: 'red.500',

            })
        }

    }




    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={5} >
                <Image
                    source={BackgroundImg}
                    alt="Background Image of people in gym"
                    defaultSource={BackgroundImg}
                    resizeMode="contain"
                    position={'absolute'}
                    opacity={0.4}
                />

                <Center my={24}>

                    <LogoSvg />
                    <Text color={'gray.200'} fontSize={'sm'}>Treine sua mente e o seu corpo</Text>
                </Center>

                <Center>
                    <Heading size='lg' color={'gray.100'} fontSize={'xl'} mb={6} fontFamily={'heading'}>
                        Crie sua conta

                    </Heading>


                    <Controller
                        control={control}
                        name='name'
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Nome"
                                keyboardType="default"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.name?.message}

                            />

                        )}
                    />




                    <Controller
                        control={control}
                        name='email'

                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.email?.message}
                                isInvalid={!!errors.email?.message}


                            />

                        )}
                    />



                    <Controller
                        control={control}
                        name='password'
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                                isInvalid={!!errors.password?.message}

                            />

                        )}
                    />


                    <Controller
                        control={control}
                        name='password_confirm'
                        render={({ field: { onChange, value } }) => (

                            <Input
                                placeholder="Confirmar Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                errorMessage={errors.password_confirm?.message}
                                isInvalid={!!errors.password_confirm?.message}

                            />

                        )}
                    />



                    <Button
                        title="Criar Conta"
                        onPress={handleSubmit(handleSignUp)}
                        isLoading={!!isLoading}
                    />
                </Center>



                <Button
                    title="Fazer Login"
                    variant={'outline'}
                    marginTop={3}
                    onPress={handleLoginAccount}
                />

            </VStack>
        </ScrollView>
    )
}