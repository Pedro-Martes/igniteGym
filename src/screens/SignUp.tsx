import { Text, VStack, Image, Center, Heading, ScrollView } from "native-base"
import BackgroundImg from '../assets/background.png'
import LogoSvg from '../assets/logo.svg'
import { Input } from "@components/input"
import { Button } from "@components/button"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"

interface FormDataProps {
    email: string;
    password: string;
    name: string;
    password_confirm: string;
}

export function Signup() {

    const {

        control,
        handleSubmit,
        formState: { errors },

    } = useForm<FormDataProps>()



    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleLoginAccount() {
        navigation.navigate('Signin')
    }

    function handleSignUp({ email, name, password, password_confirm }: FormDataProps) {
        console.log({ email, name, password, password_confirm });
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
                        rules={{
                            required: 'Campo obrigatório',
                            pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: 'Digite apenas letras',
                            },


                        }}
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
                        rules={{
                            required: 'E-mail é obrigatório',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'E-mail inválido'
                            }
                        }}
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

                            />

                        )}
                    />



                    <Button
                        title="Criar Conta"
                        onPress={handleSubmit(handleSignUp)}
                    />
                </Center>



                <Button
                    title="Fazer Login"
                    variant={'outline'}
                    marginTop={50}
                    onPress={handleLoginAccount}
                />

            </VStack>
        </ScrollView>
    )
}