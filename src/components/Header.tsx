import { Center, Heading } from "native-base"

interface  Props {
    title: string
}
export function Header({title}: Props){
    return(
        <Center bg={'gray.600'} pt={16} pb={6}>
            <Heading
            color={'gray.100'}
            fontSize={'xl'}
            fontFamily={'heading'}
            >
                {title}
            </Heading>
        </Center>
    )
}