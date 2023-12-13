import { Text, VStack, Image, Center, Heading, ScrollView } from "native-base"
import BackgroundImg from '../assets/background.png'
import LogoSvg from '../assets/logo.svg'
import { Input } from "@components/input"
import { Button } from "@components/button"
import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorRoutesProps } from "@routes/auth.routes"


export function Signup() {

    
    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleLoginAccount(){
        navigation.navigate('Signin')
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
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

                    <Input
                        placeholder="Nome"
                        keyboardType="default"
                  
                    />

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
                        title="Criar Conta"
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