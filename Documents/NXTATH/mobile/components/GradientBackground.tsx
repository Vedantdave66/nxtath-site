import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";

export const COLORS = {
  orange: "#F37018",
  orangeHover: "#D46011",
  navy: "#0A0A1F",
  lightNavy: "#1B1B33",
  text: "#FFFFFF",
};

export default function GradientBackground({ children }: { children: React.ReactNode }) {
  return (
    <LinearGradient
      colors={[COLORS.navy, COLORS.lightNavy]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.fill}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
