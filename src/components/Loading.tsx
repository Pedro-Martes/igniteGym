import { Spinner, Center, Text } from "native-base";


export function Loading(){




    return(
        <Center bg={"gray.700"} flex={1}>
        <Spinner color={"green.500"} size={'md'}/>
        <Text color={'amber.100'}>Carregando...</Text>
        </Center>
    )
}