import { Box, Center, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";
import BodySvg from '@assets/body.svg'
import SereisSvg from '@assets/series.svg'
import RepeatSvg from '@assets/repetitions.svg'
import { Button } from "@components/button";

export function Exercise() {

    const Navigation = useNavigation<AppNavigationRoutesProps>()

    function handleGoBack() {
        //ir para a tela anterior
        Navigation.goBack()

    }


    return (
        <VStack flex={1} >

            {/* Header da tela: */}
            <VStack px={8} bg={'gray.600'} pt={12} >

                <HStack mt={4} mb={8} alignItems={'center'}>

                    <TouchableOpacity >
                        <Icon
                            as={Feather}
                            name="arrow-left"
                            color={'green.500'}
                            size={6}
                            onPress={handleGoBack}
                        />
                    </TouchableOpacity>
                    <Heading color={'gray.100'} fontSize={'lg'} flexShrink={1} flex={1} ml={2} fontFamily={"heading"}>
                        Puxada Frontal
                    </Heading>
                    <HStack alignItems={'center'}>
                        <BodySvg />
                        <Text ml={1} color={'gray.200'} textTransform={'capitalize'}>Costas</Text>
                    </HStack>
                </HStack>
            </VStack>

            {/* corpo */}
            <ScrollView showsVerticalScrollIndicator={false} >
                <VStack p={8}>

                    <Image
                        w={'full'}
                        h={80}
                        source={{ uri: 'https://th.bing.com/th/id/OIG.wwgsmEE0FAjuG4kuoO0y?w=1024&h=1024&rs=1&pid=ImgDetMain' }}
                        alt="Detalhes do Exercício"
                        mb={3}
                        resizeMode="cover"
                        rounded={'lg'}
                    />
                    <Box backgroundColor={'gray.500'} rounded={'md'} pb={4} px={4} mb={96} >
                        <HStack alignItems={'center'} justifyContent={'space-around'} mb={6} mt={5}>

                            <HStack>
                                <SereisSvg />
                                <Text ml={2} color={'gray.200'}>3 Series</Text>
                            </HStack>

                            <HStack>
                                <RepeatSvg />
                                <Text ml={2} color={'gray.200'}>2x Repetições</Text>
                            </HStack>

                        </HStack>
                        <Button
                            title="Marcar como realizada"
                        />

                    </Box>



                </VStack>
            </ScrollView>

        </VStack >
    )
}