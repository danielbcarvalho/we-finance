import React from "react";
import { ActivityIndicator } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { AppRoutes } from "./src/routes/app.routes";

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
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
