
import { Text, View, StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { THEME } from './src/theme';
import { Routes } from './src/routes';
import { AuthContextProvider } from './src/context/AuthContext';


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })


  return (

    <NativeBaseProvider theme={THEME}>




      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent
      />
      <AuthContextProvider>


        {fontsLoaded ?
          <Routes />
          :
          <Loading />
        }
      </AuthContextProvider>


    </NativeBaseProvider>
  );
}

