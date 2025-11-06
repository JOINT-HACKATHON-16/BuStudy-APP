import { useColorScheme } from '@/hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      const refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
      
      console.log('Access Token:', accessToken ? 'exists' : 'none');
      console.log('Refresh Token:', refreshToken ? 'exists' : 'none');

      // 리프레시 토큰이 있으면 로그인된 것으로 간주
      if (refreshToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated === null) return; // 아직 확인 중

    const inAuthGroup = segments[0] === '(Login)' || segments[0] === '(SignUp)' || !segments[0];

    if (isAuthenticated && inAuthGroup) {
      // 로그인 되어 있으면 메인 화면으로
      router.replace('/(tabBar)/TabBarLayout');
    } else if (!isAuthenticated && !inAuthGroup) {
      // 로그인 안 되어 있으면 시작 화면으로
      router.replace('/');
    }
  }, [isAuthenticated, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    </Stack>
  );
}


export default function RootLayout() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'Suit-Medium': require('../assets/font/SUIT-Medium.otf'),
    'Suit-Bold': require('../assets/font/SUIT-Bold.otf'),
    'Suit-Semibold': require('../assets/font/SUIT-SemiBold.otf'),
    'Suit-Heavy': require('../assets/font/SUIT-Heavy.otf'),
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootLayoutNav />
      <StatusBar style="auto" />
    </ThemeProvider>
    </QueryClientProvider>
  );
}
