import React from "react";
import { ActivityIndicator } from "react-native";
import { ThemeProvider } from "styled-components/native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import Dashboard from "./src/screens/Dashboard/Dashboard";
import Register from "./src/screens/Register/Register";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <ActivityIndicator
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
        color={theme.colors.secondary}
        size="large"
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <Dashboard /> */}
      <Register />
    </ThemeProvider>
  );
}
