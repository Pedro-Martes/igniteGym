
import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base"
type Props = IButtonProps & {
    title: string
    variant?: 'solid' | 'outline'
}

export function Button({ title,variant= 'solid', ...rest }: Props) {
    return (
        <>
            <ButtonNativeBase
                width={'full'}
                height={14}
                backgroundColor={variant === 'outline' ?  'transparent' : 'green.700'}
                rounded={'md'}
                borderWidth={1}
                borderColor={variant === 'outline' ?  'green.500' : 'transparent'}
                _pressed={{
                    backgroundColor: variant === 'outline' ?  'gray.500' :'green.500',
                }}
                {...rest}
            >
                <Text
                    color={'gray.100'}
                    fontFamily={'heading'}
                    fontSize={'sm'}

                >
                    {title}

                </Text>
            </ButtonNativeBase>
        </>
    )
}