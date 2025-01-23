import { DefaultTheme } from "react-native-paper";

const customTheme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        primary: "#404040", // Secondary text color for primary actions
        accent: "#404040", // Accent color
        background: "#FFF8EA", // App background color
        surface: "#FFFFFF", // Component background surfaces (e.g., cards)
        text: "#404040", // Main text color
        placeholder: "#3F604E", // Placeholder text color
        disabled: "rgba(63, 96, 78, 0.5)", // Disabled elements (secondary text with opacity)
        error: "#B00020", // Error color
        onSurface: "#404040", // Text color on surface components
        border: "#FFFFFF", // Component borders
        outline: "#404040"
    },
    fonts: {
        regular: {
            fontFamily: "MonumentExtended-Regular",
            fontWeight: "normal",
        },
        bodySmall: {
            fontFamily: "MonumentExtended-Regular",
            fontWeight: "normal",
        },
        bodyLarge: {
            fontFamily: "MonumentExtended-Regular",
            fontWeight: "normal",
        },
        labelLarge: {
            fontFamily: "MonumentExtended-Regular",
            fontWeight: "normal",
        },
        bold: {
            fontFamily: "MonumentExtended-Regular",
            fontWeight: "900",
        },
        medium: {
            fontFamily: "MonumentExtended-Regular",
            fontWeight: "500",
        },
        light: {
            fontFamily: "MonumentExtended-Regular",
            fontWeight: "300",
        },
        thin: {
            fontFamily: "MonumentExtended-Regular",
            fontWeight: "100",
        },
    },
};

export default customTheme;
