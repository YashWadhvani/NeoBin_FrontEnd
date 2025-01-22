import { DefaultTheme } from "react-native-paper";

const customTheme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        primary: "#3F604E", // Secondary text color for primary actions
        accent: "#3F604E", // Accent color
        background: "#FFF8EA", // App background color
        surface: "#FFFFFF", // Component background surfaces (e.g., cards)
        text: "#404040", // Main text color
        placeholder: "#3F604E", // Placeholder text color
        disabled: "rgba(63, 96, 78, 0.5)", // Disabled elements (secondary text with opacity)
        error: "#B00020", // Error color
        onSurface: "#404040", // Text color on surface components
        border: "#FFFFFF", // Component borders
    },
    fonts: {
        regular: {
            fontFamily: "Valorant",
            fontWeight: "normal",
        },
        // bold: {
        //     fontFamily: "MonumentExtended-Ultrabold",
        //     fontWeight: "normal",
        // },
        // medium: {
        //     fontFamily: "MonumentExtended-Ultrabold",
        //     fontWeight: "300",
        // },
        // light: {
        //     fontFamily: "MonumentExtended-Regular",
        //     fontWeight: "300",
        // },
        // thin: {
        //     fontFamily: "MonumentExtended-Regular",
        //     fontWeight: "100",
        // },
    },
};

export default customTheme;
