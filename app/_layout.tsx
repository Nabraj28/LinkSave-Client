import Loader from "@/components/Loader";
import toastConfig from "@/components/ToastConfig";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

const client = new QueryClient();

function AuthenticatedStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

function UnauthenticatedStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}


function AuthGate() {
  const { authState } = useAuth();

  if (authState.isLoading) return <Loader />;

  return authState.isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />;
}


export default function RootLayout() {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <ThemeProvider>
          <AuthGate />
          <Toast config={toastConfig} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}