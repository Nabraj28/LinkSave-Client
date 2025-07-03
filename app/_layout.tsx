import toastConfig from "@/components/ToastConfig";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import AuthGate from "@/utils/stackUtils";

const client = new QueryClient();

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