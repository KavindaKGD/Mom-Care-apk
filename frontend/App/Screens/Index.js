import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  ImageBackground,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const carouselItems = [
    { image: require('../../assets/health.jpg'), title: 'Healthy Baby Tips' },
    { image: require('../../assets/funny.jpg'), title: 'Fun Facts' },
    { image: require('../../assets/outdoor.jpg'), title: 'Outdoor Activities' },
  ];

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'raleway': require('../../assets/fonts/Raleway-Regular.ttf'),
        'raleway-bold': require('../../assets/fonts/Raleway-SemiBold.ttf'),
        'Appname': require('../../assets/fonts/Fredoka-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();

    const interval = setInterval(() => {
      setActiveIndex(prevIndex =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!fontsLoaded) return null;

  // Buttons functions
  const handleRestartOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'false');
      navigation.navigate('OnboardingFlow');
    } catch (error) {
      console.error(error);
    }
  };

  const displayMotherName = async () => {
    try {
      const storedMotherName = await AsyncStorage.getItem('motherName');
      if (storedMotherName) Alert.alert('Mother Name', storedMotherName);
      else Alert.alert('No Name Found', 'Please set the mother name first.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/Background.png')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>MomCare</Text>
        </View>

        {/* Carousel */}
        <Text style={styles.sectionTitle}>Daily Health Tips</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carouselContainer}
        >
          {carouselItems.map((item, index) => (
            <View key={index} style={styles.carouselItem}>
              <Image source={item.image} style={styles.carouselImage} />
              <Text style={styles.carouselTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {carouselItems.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        {/* Quick Access Cards */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickAccessContainer}>
          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => navigation.navigate('BabyGrowth')}
          >
            <Icon name="line-chart" size={30} color="#8B4B8B" />
            <Text style={styles.quickAccessText}>Growth</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => navigation.navigate('Report')}
          >
            <Icon name="lightbulb-o" size={30} color="#8B4B8B" />
            <Text style={styles.quickAccessText}>Tips</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => navigation.navigate('Clinic')}
          >
            <Icon name="credit-card" size={30} color="#8B4B8B" />
            <Text style={styles.quickAccessText}>Cards</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAccessItem}
            onPress={() => navigation.navigate('Map')}
          >
            <Icon name="user-md" size={30} color="#8B4B8B" />
            <Text style={styles.quickAccessText}>Doctors</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Buttons */}
        {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BabyGrowth')}>
          <Text style={styles.buttonText}>View Baby Growth</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.button} onPress={handleRestartOnboarding}>
          <Text style={styles.buttonText}>Restart Onboarding</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={displayMotherName}>
          <Text style={styles.buttonText}>Show Mother's Name</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, backgroundColor: 'transparent' },
  header: { justifyContent: 'center', alignItems: 'center', paddingTop: (StatusBar.currentHeight ?? 0) + 16, paddingBottom: 10 },
  logo: { fontFamily: 'Appname', fontSize: 35, color: '#A91E64', opacity: 0.8 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#8B4B8B', marginLeft: 15, marginTop: 15 },
  carouselContainer: { height: 200 },
  carouselItem: { width: width, height: 200, justifyContent: 'center', alignItems: 'center' },
  carouselImage: { width: width - 40, height: 180, borderRadius: 10 },
  carouselTitle: { position: 'absolute', bottom: 20, left: 30, color: '#FFF', fontSize: 18, fontWeight: 'bold', textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: { width: -1, height: 1 }, textShadowRadius: 10 },
  pagination: { flexDirection: 'row', justifyContent: 'center', marginTop: 5 },
  paginationDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)', marginHorizontal: 4 },
  paginationDotActive: { backgroundColor: '#FFF' },
  quickAccessContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 15 },
  quickAccessItem: { alignItems: 'center', backgroundColor: '#FFD7BA', borderRadius: 10, padding: 15, width: '45%', marginBottom: 15 },
  quickAccessText: { marginTop: 5, color: '#8B4B8B' },
  button: { backgroundColor: '#E75480', padding: 15, borderRadius: 8, marginVertical: 10, marginHorizontal: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default HomeScreen;
