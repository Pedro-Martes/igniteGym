import { HistoryDTO } from "../dtos/historyDTO";
import { HStack, Heading, Text, VStack } from "native-base";

type Props = {
    data: HistoryDTO
}

export function HistoryCard({data}: Props) {
    return (
        <HStack bg={'gray.600'} w={'full'} px={5} py={4} mb={3} rounded={'md'} alignItems={'center'} justifyContent={'space-between'}>

            <VStack mr={5} flex={1}>
                <Heading color={'gray.100'}  fontSize={'md'} textTransform={'capitalize'} fontFamily={"heading"}>
                    {data.group}
                </Heading>
                <Text color={'gray.200'} fontSize={'lg'} numberOfLines={1}>{data.name}</Text>
            </VStack>
            <Text mt={2} color={'gray.300'} fontSize={'md'}>{data.hour}</Text>
        </HStack>
    )
}