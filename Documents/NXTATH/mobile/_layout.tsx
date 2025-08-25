import { Poppins_400Regular, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });
  if (!loaded) return <View />; // simple splash while fonts load

  return <Stack screenOptions={{ headerShown: false }} />;
}
