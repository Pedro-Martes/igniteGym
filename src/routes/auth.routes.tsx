import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Signup } from "@screens/SignUp"
import { Signin } from "@screens/Signin"


type AuthRouts =
    {
        Signin: undefined;
        Signup: undefined;
    }


export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRouts>;


const { Navigator, Screen } = createNativeStackNavigator<AuthRouts>()


export function AuthRoutes() {
    return (

        <Navigator screenOptions={{headerShown: false}}>

            <Screen name="Signin" component={Signin} />

            <Screen name="Signup" component={Signup} />


        </Navigator>


    )
}