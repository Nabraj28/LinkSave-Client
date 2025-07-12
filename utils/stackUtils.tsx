import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { useFonts, WorkSans_400Regular, WorkSans_700Bold, WorkSans_500Medium } from "@expo-google-fonts/work-sans";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const AuthenticatedStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

const UnauthenticatedStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}


const AuthGate = () => {

  const router = useRouter();
  const { authState } = useAuth();

  const [fontsLoaded] = useFonts({
    'WorkSans-Regular': WorkSans_400Regular,
    'WorkSans-Medium': WorkSans_500Medium,
    'WorkSans-Bold': WorkSans_700Bold,
  });

  useEffect(() => {
    if (!authState.isLoading && authState.isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [authState]);


  if (!fontsLoaded) return <Loader />;

  return authState.isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />
};

export default AuthGate;