import { useRouter } from "expo-router";
import React, { useRef } from "react";
import {
  Animated,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import GradientBackground, { COLORS } from "../components/GradientBackground";

// Reusable animated button (press + web hover)
function AnimatedButton({
  style,
  children,
  onPress,
  accessibilityLabel,
}: {
  style?: any;
  children: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (to: number, duration = 100) =>
    Animated.timing(scale, { toValue: to, duration, useNativeDriver: true });

  const onPressIn = () => animateTo(0.98).start();
  const onPressOut = () => animateTo(1).start();

  // Web-only hover (RN Web adds these handlers)
  const onHoverIn = () => {
    if (Platform.OS === "web") animateTo(1.02, 120).start();
  };
  const onHoverOut = () => {
    if (Platform.OS === "web") animateTo(1, 120).start();
  };

  return (
    <Pressable
      role="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      // @ts-ignore - hover props exist in react-native-web
      onHoverIn={onHoverIn}
      // @ts-ignore
      onHoverOut={onHoverOut}
      style={[Platform.OS === "web" ? { cursor: "pointer" } : null]}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

export default function Landing() {
  const router = useRouter();

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingVertical: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />

            <Text style={styles.wordmark}>NXTATH</Text>
            <Text style={styles.tagline}>FOR ALL THE 99% THAT DIDN’T GO PRO!</Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>What is NXTATH?</Text>
              <Text style={styles.cardBody}>
                A platform for amateur athletes to build a brand, get scouted, sell merch,
                and get discovered—without needing a pro contract.
              </Text>

              <Text style={[styles.cardTitle, { marginTop: 16 }]}>Why It Matters</Text>
              <Text style={styles.cardBody}>
                Instagram wasn’t made for athletes. TikTok was built for views. We built this for you.
              </Text>
            </View>

            <AnimatedButton
              accessibilityLabel="Join the waitlist"
              onPress={() => router.push("/waitlist")}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>JOIN THE WAITLIST</Text>
            </AnimatedButton>

            <AnimatedButton
              accessibilityLabel="Submit athlete profile"
              onPress={() => router.push("/submit")}
              style={styles.secondaryCta}
            >
              <Text style={styles.secondaryCtaText}>SUBMIT ATHLETE PROFILE</Text>
            </AnimatedButton>

            <Text style={styles.footer}>© 2025 NXTATH. POWERED BY HANUMAN.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  logo: { width: 86, height: 86, resizeMode: "contain", marginBottom: 12 },
  wordmark: { fontFamily: "Poppins_700Bold", fontSize: 44, color: COLORS.orange, letterSpacing: 2, marginBottom: 8 },
  tagline: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.text,
    textAlign: "center",
    opacity: 0.95,
    marginBottom: 22,
  },

  card: {
    width: "100%",
    backgroundColor: "#121228",
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "rgba(243,112,24,0.18)",
    // subtle glow/shadow
    shadowColor: "#F37018",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  cardTitle: { fontFamily: "Poppins_700Bold", fontSize: 18, color: COLORS.text, marginBottom: 6 },
  cardBody: { fontFamily: "Poppins_400Regular", fontSize: 14, lineHeight: 20, color: COLORS.text, opacity: 0.9 },

  cta: {
    backgroundColor: COLORS.orange,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    // glow/shadow
    shadowColor: "#F37018",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    width: "100%",
  },
  ctaText: { color: COLORS.text, fontFamily: "Poppins_700Bold", fontSize: 16 },

  secondaryCta: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.orange,
    alignItems: "center",
    // soft white shadow for contrast
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 8,
    width: "100%",
  },
  secondaryCtaText: { color: COLORS.text, fontFamily: "Poppins_700Bold", fontSize: 14, opacity: 0.9 },

  footer: {
    color: COLORS.text,
    opacity: 0.6,
    fontSize: 12,
    textAlign: "center",
    marginTop: 14,
    fontFamily: "Poppins_400Regular",
  },
});
