import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { Box, useTheme } from 'native-base'
import { AppRoutes } from './app.routes'
import { Exercise } from '@screens/Excercise'
import { AuthCOntext } from '../context/AuthContext'
import { useContext } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Loading } from '@components/Loading'


export function Routes() {

    const { colors } = useTheme()
    const { user, isLoadingUserStorageData } = useAuth()

    console.log("usuário", user);

    const theme = DefaultTheme
    theme.colors.background = colors.gray[900]

    if (isLoadingUserStorageData) {
        return <Loading />
    } else {

        return (

            <Box flex={1} backgroundColor={'gray.900'}>

                <NavigationContainer theme={theme}>
                    {user.id ?
                        <AppRoutes />
                        : <AuthRoutes />
                    }


                </NavigationContainer>
            </Box>
        )
    }
}