import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/lib/auth";

export default function Index() {
  const { session, profile, loading } = useAuth();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("onboarded").then((v) => setOnboarded(!!v));
  }, []);

  // Wait for: fonts/auth loading, onboarded check, AND profile when session exists
  if (loading || onboarded === null || (session && !profile)) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
        <ActivityIndicator color="#16C47F" size="large" />
      </View>
    );
  }

  if (!onboarded) return <Redirect href="/onboarding" />;
  if (session && profile?.role === "provider") return <Redirect href={"/(provider)" as any} />;
  if (session && profile?.role === "admin") return <Redirect href={"/(provider)" as any} />;
  return <Redirect href={"/(tabs)" as any} />;
}
