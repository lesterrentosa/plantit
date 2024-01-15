import {View, Text, ScrollView, Image, TextInput, TouchableOpacity, Pressable} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { StatusBar } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon, CameraIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Plants from '../components/plants';
import axios from 'axios';
import OpenCamera from './OpenCamera';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen(){

  const navigation = useNavigation();
  // const [activeCategory, setActiveCategory] = useState('Beef');
  // const [categories, setCategories] = useState([]);
  const [halaman, setHalaman] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlants, setFilteredPlants] = useState([]);



  useEffect (()=>{
    getPlants();
  }, [])

  const getPlants = async () => {
    try {
      const response = await axios.get('https://perenual.com/api/species-list?key=sk-UfAV64f71bef8b09e2084');
      // console.log('got plants: ', response.data);
  
      if (response && response.data) {
        setHalaman(response.data.data); // Set halaman to response.data.data
        setFilteredPlants(response.data.data);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  }

  const handleSearch = () => {
    const searchTerm = searchQuery.trim().toLowerCase();
    const filtered = halaman.filter((plant) => plant.common_name && plant.common_name.toLowerCase().includes(searchTerm));
    setFilteredPlants(filtered);
  };
  
  
  
  

  return(
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-4"
      >
        <View className="mx-4 flex-row justify-between items-center mb-1">
          <Pressable
            onPress={()=> navigation.navigate('OpenCamera')}
          >
            <CameraIcon size={hp(5)} color="green" />
          </Pressable>
         
          <BellIcon size={hp(4)} color="gray" />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <View>
            <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">Explore plants,</Text>
          </View>
          <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">stay at <Text className="text-green-600">home</Text></Text>
        </View>

        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='Search any plants'
            placeholderTextColor={'gray'}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <TouchableOpacity onPress={handleSearch} className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </TouchableOpacity>
        </View>

        <View>
        <Plants filteredHalaman={filteredPlants} />
        </View>
      </ScrollView>
    </View>
  )
}