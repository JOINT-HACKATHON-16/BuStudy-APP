import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts } from 'expo-font';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View } from 'react-native';


export default function RootLayout() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'Suit-Medium': require('../assets/font/SUIT-Medium.otf'),
    'Suit-Bold': require('../assets/font/SUIT-Bold.otf'),
    'Suit-Semibold': require('../assets/font/SUIT-SemiBold.otf'),
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </QueryClientProvider>
  );
}
