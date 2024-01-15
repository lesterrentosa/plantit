import {View, Text, StatusBar, Image} from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => (ring1padding.value = withSpring(ring1padding.value + hp(5))), 100);
    setTimeout(() => (ring2padding.value = withSpring(ring1padding.value + hp(5.5))), 300);

    const navigateToHome = async () => {
      // Use reset to replace the current navigation state with a new one
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    };

    const timeoutId = setTimeout(navigateToHome, 2500);

    // Clear the timeout when the component unmounts to avoid any potential memory leaks
    return () => clearTimeout(timeoutId);
  }, [navigation, ring1padding.value]);

  return(
    <View className="flex-1 justify-center items-center space-y-10 bg-green-600">
      <StatusBar style="light" />

      {/* image with rings */}
      <Animated.View className="bg-white/20 rounded-full" style={{padding: ring2padding}}>
        <Animated.View className="bg-white/20 rounded-full"style={{padding: ring1padding}}>
          <Image source={require('../../assets/images/welcome.png')}
            style={{width: hp(20), height: hp(20)}} />
        </Animated.View>
      </Animated.View>
      {/* text */}
      <View className="flex items-center space-y-2">
          <Text style={{fontSize: hp(7)}} className="font-bold text-white tracking-widest">
            Plantit
          </Text>
          <Text style={{fontSize: hp(2)}} className="font-medium text-white tracking-widest text-lg">
            Plant
          </Text>
        </View>
    </View>
  )
}