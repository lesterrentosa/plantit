import {View, Text, ScrollView, StatusBar, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { CachedImage } from '../helpers/image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ArrowPathIcon, ArrowPathRoundedSquareIcon, BeakerIcon, ChevronLeftIcon, ClockIcon, ExclamationCircleIcon, HomeIcon, SunIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading'
import axios from 'axios';

export default function PlantDetailScreen(props){
  let items = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [plant, setPlant] = useState(null);
 //const [plantCare, setPlantCare] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getPlantData(items.id);
    //getPlantCare(items.id);
  }, [])

  const getPlantData = async (id) => {
    try {
      const response = await axios.get(`https://perenual.com/api/species/details/${id}?key=sk-UfAV64f71bef8b09e2084`);
      // console.log('got plant data: ', response.data);
  
      if (response && response.data) {
        setPlant(response.data); // Set halaman to response.data.data
        setLoading(false)
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  }
  // const getPlantCare = async (id) => {
  //   try {
  //     const response = await axios.get(`https://perenual.com/api/species/details/${id}?key=sk-UfAV64f71bef8b09e2084`);
  //     // console.log('got plant data: ', response.data);
  
  //     if (response && response.data) {
  //       setPlantCare(response.data); // Set halaman to response.data.data
  //       setLoading(false)
  //     }
  //   } catch (err) {
  //     console.log('error: ', err.message);
  //   }
  // }

  return(
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar style={"light"} />
      <View className="flex-row justify-center">
        <CachedImage
          uri = {items.default_image && items.default_image.original_url}
          style={{width: wp(98), height: hp(50), borderRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginTop: 4}}
          className="bg-black/5"
        />
      </View>
      <View className="w-full absolute flex-row justify-between items-center pt-8">
        <TouchableOpacity onPress={()=> navigation.goBack()} className="p-2 rounded-full ml-3 bg-white">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} className="p-2 rounded-full mr-3 bg-white">
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite? "red":"gray"} />
        </TouchableOpacity>
      </View>

      {
        loading? (
          <Loading size="large" className="mt-16" />
        ) : (
          <View className="px-4 flex justify-between space-y-4 pt-5" >
            <View className="space-y-1">
              <Text style={{fontSize: hp(3)}} className="font-bold flex-1 text-green-700" >
                {plant?.common_name}
              </Text>
              <Text style={{fontSize: hp(2)}} className="font-medium flex-1 text-neutral-500" >
                {plant?.scientific_name}
              </Text>
            </View>

            <View className="flex-row justify-around">
              <View className="flex rounded-full bg-green-300 p-2 items-center">
                <View 
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <HomeIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                    {plant?.type}
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                    Type
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-green-300 p-2 items-center">
                <View 
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <SunIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                    {plant?.sunlight[0]}
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                    Sunlight
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-green-300 p-2 items-center">
                <View 
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <ArrowPathIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                    {plant?.cycle}
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                    Cycle
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-green-300 p-2 items-center">
                <View 
                  style={{height: hp(6.5), width: hp(6.5)}}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <BeakerIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text style={{fontSize: hp(2)}} className="font-bold text-neutral-700">
                    {plant?.watering}
                  </Text>
                  <Text style={{fontSize: hp(1.3)}} className="font-bold text-neutral-700">
                    Watering
                  </Text>
                </View>
              </View>
            </View>
            <View className="space-y-4">
              <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                Description
              </Text>
              <View className="space-y-2 ml-1">
                <Text style={{textAlign: 'justify', lineHeight: hp(3)}}>
                  {plant?.description}
                </Text>
              </View>
            </View>
            <View className="space-y-4">
              <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                Care Guide
              </Text>
              <View className="space-y-2 ml-1">
               
              </View>
            </View>
          </View>
        )
      }

    </ScrollView>
    
  )
}
