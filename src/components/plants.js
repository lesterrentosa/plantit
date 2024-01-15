import {View, Text, Pressable, Image} from 'react-native'
import React  from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import {mealData} from '../constants'
import Animated, { FadeInDown} from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';

export default function Plants({ filteredHalaman }) {
  const navigation = useNavigation();
  return (
    <View className="mx-4 space-y-3">
      <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600">
        Plants
      </Text>
      <View>
        <MasonryList
          data={filteredHalaman}
          keyExtractor={(item) => item.id.toString()}  // Ensure id is unique and converted to string
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => <PlantCard item={item} index={index} navigation={navigation} />}
        />
      </View>
    </View>
  );
}


const PlantCard = ({item, index, navigation}) => {
  let isEven = index%2==0;
  return (
    <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
      <Pressable
        style={{width: '100%', paddingLeft: isEven? 0:8, paddingRight: isEven? 8:0}}
        className="flex justify-center mb-4 space-y-1"
        onPress={()=> navigation.navigate('PlantDetail', {...item})}
      >
        {/* <Image 
          source={{uri: item.default_image && item.default_image.thumbnail}}
          style={{width: '100%', height: index%3==0? hp(25):hp(35), borderRadius: 35}}
          className="bg-black/5"
        /> */}
        <CachedImage
          uri = {item.default_image && item.default_image.original_url}
          style={{width: '100%', height: index%3==0? hp(25):hp(35), borderRadius: 35}}
          className="bg-black/5"
        />
        <Text style={{fontSize: hp(1.8)}} className="font-semibold ml-2 text-neutral-600">
          {
            item.common_name.length>20? item.common_name.slice(0,20)+'...': item.common_name
          }
        </Text>
      </Pressable>

    </Animated.View>
  )
}