import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
    errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {

    const isInvalidInput = !!errorMessage || isInvalid

    return (
        <FormControl isInvalid={isInvalidInput}>

            <FormControl.ErrorMessage mb={2}>
                {errorMessage}
            </FormControl.ErrorMessage>

            <NativeBaseInput
                bg={'gray.700'}
                h={14}
                paddingX={4}
                borderWidth={0}
                fontSize={'md'}
                color={'gray.100'}
                fontFamily={'body'}
                marginBottom={1}

                placeholderTextColor={'gray.300'}
                _focus={{
                    backgroundColor: 'gray.700',
                    borderWidth: 1,
                    borderColor: 'green.500'
                }}
                {...rest}

            />

        </FormControl>
    )
}