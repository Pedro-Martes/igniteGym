import { Text, Pressable, IPressableProps } from "native-base"
import { useState } from "react"

type GroupsProps = IPressableProps & {
    name: string
    isActive: boolean
}
export function Groups({ name,isActive, ...rest }: GroupsProps) {

   


    return (

        <Pressable
            marginRight={3}
            w={24}
            h={10}
            backgroundColor={'gray.600'}
            rounded={'md'}
            justifyContent={'center'}
            alignItems={'center'}
            overflow={'hidden'}
            isPressed= {isActive}
            _pressed={{
                borderColor: 'green.500',
                borderWidth: 1
            }}
            {...rest}
        >

            <Text
                color={  isActive ? 'green.500' : 'gray.100'}
                textTransform={'uppercase'}
                fontSize={'xs'}
                fontWeight={'bold'}

            >
                {name}
            </Text>
        </Pressable>
    )
}