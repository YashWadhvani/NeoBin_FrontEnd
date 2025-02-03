import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import DashboardScreen from "./screens/DashboardScreen";
import customTheme from "./theme/customTheme";
import { AuthProvider } from "./contexts/AuthContext";
import * as Font from "expo-font";
import TruckLoader from "./components/loader/TruckLoader";
import BinGridScreen from "./screens/BinGridScreen";

const Stack = createStackNavigator();

const loadFonts = () =>
    Font.loadAsync({
        "MonumentExtended-Regular": require("./assets/fonts/MonumentExtended-Regular.otf"),
        "MonumentExtended-Ultrabold": require("./assets/fonts/MonumentExtended-Ultrabold.otf"),
        Valorant: require("./assets/fonts/Valorant.ttf"),
    });

export default function App() {
    const [fontsLoaded, setFontsLoaded] = React.useState(false);
    const [loadingFinished, setLoadingFinished] = React.useState(false);

    React.useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true));

        const timeout = setTimeout(() => {
            setLoadingFinished(true);
        }, 6000);

        return () => clearTimeout(timeout);
    }, []);

    if (!loadingFinished) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Loader"
                        options={{ headerShown: false }}
                    >
                        {() => <TruckLoader nextScreen="Splash" />}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <PaperProvider theme={customTheme}>
            <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Splash">
                        <Stack.Screen
                            name="Splash"
                            component={SplashScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Signup"
                            component={SignupScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Dashboard"
                            component={DashboardScreen}
                        />
                        <Stack.Screen
                            name="BinGrid"
                            component={BinGridScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthProvider>
        </PaperProvider>
    );
}
