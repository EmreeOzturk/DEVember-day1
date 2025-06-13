/* eslint-disable react-hooks/exhaustive-deps */
import { router, Stack } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const { width } = Dimensions.get('window')

const onboardingData = [
  {
    id: 1,
    title: 'Welcome to\nFamiFi!',
    subtitle: "Streamline your family's\nfinancial journey, one goal at a\ntime.",
    backgroundColor: '#3D2F1F',
    icon: '🌳'
  },
  {
    id: 2,
    title: 'Set Your\nSavings\nGoals',
    subtitle: "Whether it's a family vacation\nor your child's education,\ndefine what you're saving for\nand watch your progress",
    backgroundColor: '#1F3D2F',
    icon: '🐷'
  },
  {
    id: 3,
    title: 'Track Every\nTransaction',
    subtitle: 'Monitor your spending and\ncontributions, ensuring every\npenny aligns with your\nfamily\'s aspirations.',
    backgroundColor: '#1F2F3D',
    icon: '↔️'
  }
]

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current
  const slideAnim = useRef(new Animated.Value(0)).current
  const iconScaleAnim = useRef(new Animated.Value(1)).current

  // Trigger animations when page changes
  useEffect(() => {
    // Reset and start animations
    Animated.sequence([
      // Fade out and slide down
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 30,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(iconScaleAnim, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      // Fade in and slide up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(iconScaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start()
  }, [currentIndex])

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true })
    } else {
      // Navigate to main app or finish onboarding
      router.back()
    }
  }

  const handleSkip = () => {
    router.back()
  }

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width
    const index = event.nativeEvent.contentOffset.x / slideSize
    const roundIndex = Math.round(index)
    
    // Only update if the index actually changed to prevent flashing
    if (roundIndex !== currentIndex && roundIndex >= 0 && roundIndex < onboardingData.length) {
      setCurrentIndex(roundIndex)
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={[styles.container, { backgroundColor: onboardingData[currentIndex].backgroundColor }]}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScroll}
          scrollEventThrottle={16}
        >
          {onboardingData.map((item, index) => (
            <View key={item.id} style={styles.slide}>
              <Animated.View 
                style={[
                  styles.content,
                  {
                    opacity: fadeAnim,
                    transform: [
                      { translateY: slideAnim },
                    ]
                  }
                ]}
              >
                <Animated.Text 
                  style={[
                    styles.icon,
                    {
                      transform: [{ scale: iconScaleAnim }]
                    }
                  ]}
                >
                  {item.icon}
                </Animated.Text>
                <Animated.Text 
                  style={[
                    styles.title,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }]
                    }
                  ]}
                >
                  {item.title}
                </Animated.Text>
                <Animated.Text 
                  style={[
                    styles.subtitle,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }]
                    }
                  ]}
                >
                  {item.subtitle}
                </Animated.Text>
              </Animated.View>
            </View>
          ))}
        </ScrollView>

        {/* Page Indicators */}
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : styles.inactiveDot
              ]}
            />
          ))}
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleNext} style={styles.continueButton}>
            <Text style={styles.continueText}>
              {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
            <Text style={styles.arrow}> →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  icon: {
    fontSize: 80,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    borderRadius: 6,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 12,
    height: 12,
    backgroundColor: '#FFD700',
    transform: [{ scale: 1.2 }],
  },
  inactiveDot: {
    width: 8,
    height: 8,
    backgroundColor: '#666',
    transform: [{ scale: 1 }],
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 50,
    paddingTop: 20,
  },
  skipButton: {
    padding: 15,
  },
  skipText: {
    color: '#CCCCCC',
    fontSize: 16,
  },
  continueButton: {
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
  },
  arrow: {
    color: '#FFD700',
    fontSize: 16,
    marginLeft: 5,
  },
})