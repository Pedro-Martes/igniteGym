import { Input as NativeBaseInput , IInputProps} from "native-base";

export function Input({...rest}: IInputProps) {
return(
    <NativeBaseInput 
    bg={'gray.700'}
    h={14}
    paddingX={4}
    borderWidth={0}
    fontSize={'md'}
    color={'gray.100'}
    fontFamily={'body'}
    marginBottom={4}
  
    placeholderTextColor={'gray.400'}
    _focus={{
        backgroundColor: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500'
    }}
    {...rest}
    
    />
)
}