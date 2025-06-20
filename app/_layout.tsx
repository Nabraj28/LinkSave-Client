import Loader from "@/components/Loader";
import toastConfig from "@/components/ToastConfig";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import { useFonts, WorkSans_700Bold, WorkSans_400Regular } from '@expo-google-fonts/work-sans';
import { Provider } from 'react-redux'
// import store from "@/data/store";

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

  const [fontsLoaded] = useFonts({
    'WorkSans-Regular': WorkSans_400Regular,
    'WorkSans-Bold': WorkSans_700Bold,
  });

  if (authState.isLoading || !fontsLoaded) return <Loader />;

  return authState.isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />;
}


export default function RootLayout() {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <ThemeProvider>
          {/* <Provider store={store}> */}
          <AuthGate />
          <Toast config={toastConfig} />
          {/* </Provider> */}
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}