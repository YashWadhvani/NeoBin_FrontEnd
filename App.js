import React from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import DashboardScreen from "./screens/DashboardScreen";
import customTheme from "./theme/customTheme";
import * as Font from "expo-font";
import TruckLoader from "./components/loader/TruckLoader";  // Import TruckLoader here

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

    // Load fonts and set loadingFinished to true after a delay
    React.useEffect(() => {
        loadFonts().then(() => setFontsLoaded(true));

        // Show loader for 2-3 seconds regardless of fonts loading
        const timeout = setTimeout(() => {
            setLoadingFinished(true);
        }, 6000); // Delay for 3 seconds

        return () => clearTimeout(timeout); // Clear timeout on cleanup
    }, []);

    if (!loadingFinished) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Loader"
                        options={{ headerShown: false }}
                    >
                        {() => (
                            <TruckLoader nextScreen="Splash" /> // Navigate to Dashboard after loading
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <PaperProvider theme={customTheme}>
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
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF8EA",
    },
});
