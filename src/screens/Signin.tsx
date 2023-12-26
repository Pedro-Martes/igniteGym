import { Text, VStack, Image, Center, Heading, ScrollView } from "native-base"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"

import { useNavigation } from "@react-navigation/native"
import BackgroundImg from '../assets/background.png'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import LogoSvg from '../assets/logo.svg'
import { Input } from "@components/input"
import { Button } from "@components/button"

import * as yup from 'yup'

interface FormDataTypes {
    email: string;
    password: string;
}

const siginSchema = yup.object({
    email: yup.string().email('Email Invalido').required('Campo obrigatório'),
    password: yup.string().min(6, 'Senha Invalida').required('Campo obrigatório')
})

export function Signin() {

    const {

        control,
        handleSubmit,
        formState: { errors },

    } = useForm<FormDataTypes>({
        resolver: yupResolver(siginSchema)
    })

    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleNewAccount() {
        navigation.navigate('Signup')
    }

    function handleSignIn({email,password}: FormDataTypes){
        console.log({email, password});
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={5} >
                <Image
                    source={BackgroundImg}
                    alt="Background Image of people in gym"
                    resizeMode="contain"
                    defaultSource={BackgroundImg}
                    position={'absolute'}
                    opacity={0.4}
                />

                <Center my={24}>
                    <LogoSvg />
                    <Text color={'gray.200'} fontSize={'sm'}>Treine sua mente e o seu corpo</Text>
                </Center>

                <Center>
                    <Heading fontFamily={"heading"} size='lg' color={'gray.100'} fontSize={'xl'} mb={6} fontFamily={'heading'}>
                        Faça login para continuar
                    </Heading>

                    <Controller
                        control={control}
                        name="email"
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
                        name="password"
                        render={({ field: { onChange, value } }) => (

                            < Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />


                    <Button
                        title="Entrar"
                        onPress={handleSubmit(handleSignIn)}
                    />

                </Center>

                <Center marginTop={50}>
                    <Text color={"gray.100"} fontSize={'sm'} fontFamily={'body'} marginBottom={3}>Ainda nao tem acesso?</Text>
                    <Button
                        title="Criar Conta"
                        variant={'outline'}
                        onPress={handleNewAccount}
                    />

                </Center>
            </VStack>
        </ScrollView>
    )
}