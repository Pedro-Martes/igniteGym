import { HStack, Heading, Text, VStack } from "native-base";



export function HistoryCard() {
    return (
        <HStack bg={'gray.600'} w={'full'} px={5} py={4} mb={3} rounded={'md'} alignItems={'center'} justifyContent={'space-between'}>

            <VStack mr={5} flex={1}>
                <Heading color={'gray.100'}  fontSize={'md'} textTransform={'capitalize'}>
                    Costas
                </Heading>
                <Text color={'gray.200'} fontSize={'lg'} numberOfLines={1}>Puxada Frontal</Text>
            </VStack>
            <Text mt={2} color={'gray.300'} fontSize={'md'}>10 de Março - 30 kg</Text>
        </HStack>
    )
}