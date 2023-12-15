import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { Box, useTheme } from 'native-base'
import { AppRoutes } from './app.routes'
import { Exercise } from '@screens/Excercise'


export function Routes() {

    const { colors } = useTheme()

    const theme = DefaultTheme
    theme.colors.background = colors.gray[900]


    return (
        <Box flex={1} backgroundColor={'gray.900'}>

            <NavigationContainer theme={theme}>
                 <AppRoutes /> 
                {/* <AuthRoutes /> */}
                {/* <Exercise /> */}
            </NavigationContainer>
        </Box>
    )
}