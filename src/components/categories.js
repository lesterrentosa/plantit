import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {categoryData} from '../constants'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown} from 'react-native-reanimated';

function App() {
  return <Animated.View entering={FadeIn} exiting={FadeOut} />;
}

export default function Categories({categories, activeCategory, setActiveCategory}){
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
          categories.map((cat, index)=>{
            let isActive = cat.name==activeCategory;
            let activeButtonClass = isActive? 'bg-green-400': 'bg-black/10';
            return (
              <TouchableOpacity
                key={index}
                onPress={()=> setActiveCategory(cat.name)}
                className="flex items-center space-y-1"
              >
                <View className={"rounded-full p-[6px] "+activeButtonClass}>
                  <Image 
                    source={{uri: cat.medium_url}}
                    style={{width: hp(6), height: hp(6)}}
                    className="rounded-full"
                  />
                </View>
                <Text className="text-neutral-600" style={{fontSize: hp(1.6)}}>
                  {cat.common_name}
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Animated.View>
  )
}