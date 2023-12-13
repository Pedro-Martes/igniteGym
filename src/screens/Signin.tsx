import { Text, VStack, Image, Center, Heading, ScrollView } from "native-base"
import BackgroundImg from '../assets/background.png'
import LogoSvg from '../assets/logo.svg'
import { Input } from "@components/input"
import { Button } from "@components/button"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"


export function Signin() {

    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleNewAccount(){
        navigation.navigate('Signup')
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
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
                    <Heading size='lg' color={'gray.100'} fontSize={'xl'} mb={6} fontFamily={'heading'}>
                        Faça login para continuar
                    </Heading>

                    <Input
                        placeholder="E-mail"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Input
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <Button
                        title="Entrar"
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