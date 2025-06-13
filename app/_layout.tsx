import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      // Hide the splash screen after fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    // Return null to keep splash screen visible while loading
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            headerTitle: 'Devember Day 1',
            headerLeft: () => (
              <Image
                source={require('../assets/images/icon.png')}
                style={styles.reactLogo}
              />
            ),
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  console.log('user profile image pressed');
                }}
                style={styles.userProfileContainer}>
                <Image
                  source={require('../assets/images/splash-icon.png')}
                  style={styles.userProfileImage}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    width: 80,
    height: 80,
  },
  userProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  userProfileContainer: {
    marginRight: 10,
  },
});