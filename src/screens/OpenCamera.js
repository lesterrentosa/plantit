import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera, CameraType } from 'expo-camera';
import Button from '../components/Button';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import PlantImageDetail from './PlantImageDetail';

export default function OpenCamera() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [apiResponse, setApiResponse] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        if (asset) {
          alert('Picture saved!');
          setImage(null);
  
          const base64Image = await convertImageToBase64(asset.uri);
  
          const updatedData = {
            images: [base64Image],
            latitude: 49.207,
            longitude: 16.608,
            similar_images: true,
          };
  
          const response = await sendApiRequest(updatedData);
  
          // Check if 'result' property is present in the response
          if (response && response.result && response.result.classification) {
            // Update state with the API response
            setApiResponse(response.result);
  
            // Navigate to the PlantImageDetail screen
            navigation.navigate('PlantImageDetail', { apiResponse: response.result });
          } else {
            console.error('Invalid API response format:', response);
            // Handle the error or show an appropriate message
          }
        } else {
          alert('Error creating asset. Please try again.');
        }
      } catch (e) {
        console.error('Error saving or sending API request:', e.message);
        // Handle the error or show an appropriate message
      }
    }
  };
  

  const convertImageToBase64 = async (imageUri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpg;base64,${base64}`;
    } catch (error) {
      throw new Error('Error converting image to Base64');
    }
  };

  const sendApiRequest = async (requestData) => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://plant.id/api/v3/identification',
      headers: {
        'Api-Key': 'hSpRxpub00hUVW5C8fbQ59736V4G0tkH1spctTihFfzorVLu3T',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(requestData),
    };
  
    try {
      const response = await axios(config);
      console.log(JSON.stringify(response.data));
      return response.data; // Return the data property of the Axios response object
    } catch (error) {
      console.error('Error in API request:', error.message);
      console.error('Error details:', error.response ? error.response.data : 'No response data');
      throw error; // Re-throw the error to handle it in the calling function
    }
  };
  

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 30,
            }}
          >
            <Button
              icon={'retweet'}
              onPress={() => {
                setType(
                  type === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                );
              }}
            />
            <Button
              color={flash === Camera.Constants.FlashMode.off ? 'gray' : 'yellow'}
              icon={'flash'}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View>
            <Button title={"Retake picture"} icon="retweet" onPress={() => setImage(null)} />
            <Button title={"Save"} icon="check" onPress={saveImage} />
          </View>
        ) : (
          <Button title={'Take a picture'} icon="camera" onPress={takePicture} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom: 20
  },
  camera: {
    flex: 1,
    borderRadius: 20,

  }
})

