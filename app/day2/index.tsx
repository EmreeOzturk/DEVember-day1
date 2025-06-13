import { Link, Stack } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Day2OnboardingScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Day 2 - Onboarding',
          headerStyle: {
            backgroundColor: '#555',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#555' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Day 2</Text>


        <Link href="/day2/onboarding" asChild>
          <TouchableOpacity style={{ backgroundColor: 'brown', padding: 10, borderRadius: 5 }}>
            <Text>Go to Onboarding</Text>
          </TouchableOpacity>
        </Link>
      </View>


    </>
  )
}

export default Day2OnboardingScreen