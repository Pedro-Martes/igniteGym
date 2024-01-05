import { useTheme } from "native-base";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Exercise } from "@screens/Excercise";
import { History } from "@screens/History";
import { Profile } from "@screens/Profile";
import { Home } from "@screens/Home";

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'
import { Platform } from "react-native";



type AppRoutes = {
    Exercise: {exerciseID: string};
    History: undefined;
    Profile: undefined;
    Home: undefined;
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();



export function AppRoutes() {

    const { sizes,colors } = useTheme();
    const iconSize = sizes[7]

    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.green[500],
            tabBarInactiveTintColor: colors.gray[300], 
            tabBarStyle: {
                backgroundColor: colors.gray[800],
                borderTopWidth: 0,
                paddingBottom: sizes[8],
                height:Platform.OS === 'android' ? 'auto' : 96 ,
                paddingTop: sizes[6]
                
            }
        }}
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg fill={color} width={iconSize} height={iconSize} />
                    )
                }}
            />
            <Screen
                name="History"
                component={History}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HistorySvg fill={color} width={iconSize} height={iconSize} />
                    )
                }}
            />

            <Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <ProfileSvg fill={color} width={iconSize} height={iconSize} />
                    )
                }}
            />
            <Screen
                name="Exercise"
                component={Exercise}
                options={{
                    tabBarButton: () => null
                }}
                
            />
        </Navigator>
    )
}