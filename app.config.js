export default {
    expo: {
        name: "NeoBin",
        slug: "NeoBin_FrontEnd",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/Logo.png",
        userInterfaceStyle: "light",
        newArchEnabled: true,
        splash: {
            image: "./assets/Logo.png",
            resizeMode: "contain",
            backgroundColor: "#FFF8EA",
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.yashwadhvani.NeoBin",
            infoPlist: {
                ITSAppUsesNonExemptEncryption: false,
            },
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/Logo.png",
                backgroundColor: "#FFF8EA",
            },
            package: "com.yashwadhvani.NeoBin",
        },
        web: {
            favicon: "./assets/Logo.png",
        },
        plugins: ["expo-font"],
        assetBundlePatterns: ["**/*"],
        extra: {
            eas: {
                projectId: "e2ea6d1c-a996-4a12-a798-0d1031b8bcf1",
            },
        },
    },
};
