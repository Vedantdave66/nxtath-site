import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import GradientBackground, { COLORS } from "../components/GradientBackground";

const TALLY_URL = "https://tally.so/embed/3qXZbg?transparentBackground=1";

export default function Submit() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const webRef = useRef<WebView>(null);

  return (
    <GradientBackground>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Submit Your Athlete Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        <Text style={styles.subtitle}>
          Ready to get seen? Share your profile and highlight link to be featured.
        </Text>

        <View style={styles.webWrap}>
          {Platform.OS === "web" ? (
            <iframe
              key={reloadKey}
              title="NXTATH Submit"
              src={TALLY_URL}
              style={{ border: 0, width: "100%", height: "100%" }}
              onLoad={() => {
                setFailed(false);
                setLoading(false);
              }}
            />
          ) : (
            <WebView
              key={reloadKey}
              ref={webRef}
              source={{ uri: TALLY_URL }}
              style={{ flex: 1 }}
              androidLayerType="hardware"
              onLoadStart={() => {
                setFailed(false);
                setLoading(true);
              }}
              onLoadEnd={() => setLoading(false)}
              onError={() => {
                setFailed(true);
                setLoading(false);
              }}
            />
          )}

          {/* Loading overlay */}
          {loading && !failed && (
            <View style={styles.overlayCenter}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>Loading form…</Text>
            </View>
          )}

          {/* Error overlay */}
          {failed && (
            <View style={styles.overlayCenter}>
              <View style={styles.errorCard}>
                <Text style={styles.errorTitle}>Couldn't load the form</Text>
                <Text style={styles.errorBody}>Check your connection and try again.</Text>

                <Pressable
                  accessibilityLabel="Retry loading submit form"
                  onPress={() => {
                    setReloadKey((k) => k + 1);
                    setFailed(false);
                    setLoading(true);
                  }}
                  style={styles.retryBtn}
                >
                  <Text style={styles.retryText}>Retry</Text>
                </Pressable>

                {Platform.OS === "web" && (
                  <Pressable
                    style={[
                      styles.retryBtn,
                      {
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: "rgba(243,112,24,0.6)",
                        marginTop: 8,
                      },
                    ]}
                    onPress={() => window.open(TALLY_URL, "_blank")}
                  >
                    <Text style={[styles.retryText, { color: COLORS.text }]}>
                      Open form in new tab
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(243,112,24,0.15)",
  },
  backText: { color: COLORS.text, fontSize: 20, fontFamily: "Poppins_700Bold" },
  title: { color: COLORS.text, fontFamily: "Poppins_700Bold", fontSize: 16 },
  subtitle: {
    color: COLORS.text,
    opacity: 0.85,
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
    fontFamily: "Poppins_400Regular",
  },
  webWrap: {
    flex: 1,
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(243,112,24,0.18)",
  },
  overlayCenter: {
    position: "absolute",
    inset: 0 as any,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  loadingText: {
    marginTop: 8,
    color: COLORS.text,
    opacity: 0.8,
    fontFamily: "Poppins_400Regular",
  },
  errorCard: {
    width: "82%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#101018",
    borderWidth: 1,
    borderColor: "rgba(243,112,24,0.25)",
    alignItems: "center",
  },
  errorTitle: { color: COLORS.text, fontFamily: "Poppins_700Bold", marginBottom: 6 },
  errorBody: {
    color: COLORS.text,
    opacity: 0.8,
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "Poppins_400Regular",
  },
  retryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#F37018",
  },
  retryText: { color: "white", fontWeight: "700", fontFamily: "Poppins_700Bold" },
});
