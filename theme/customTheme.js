import { DefaultTheme } from "react-native-paper";

const customTheme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        primary: "#404040",
        accent: "#404040",
        background: "#FFF8EA",
        surface: "#FFFFFF",
        text: "#404040",
        placeholder: "#3F604E",
        disabled: "rgba(63, 96, 78, 0.5)",
        error: "#B00020",
        onSurface: "#404040",
        border: "#FFFFFF",
        outline: "#404040",
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
