import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PlantImageDetail = ({ route }) => {
  const { apiResponse } = route.params;

  // Log the API response to the console
  console.log('API Response:', JSON.stringify(apiResponse));

  // Extract relevant information from the API response
  const isPlant = apiResponse.is_plant;
  const classification = apiResponse.classification;

  if (isPlant && isPlant.binary && classification && classification.suggestions) {
    const suggestions = classification.suggestions;

    // Assuming the first suggestion is the most probable one
    if (suggestions.length > 0) {
      const topSuggestion = suggestions[0];
      const plantName = topSuggestion.name;
      const plantProbability = topSuggestion.probability;
      const plantImageURL = topSuggestion.similar_images[1].url;

      return (
        <View style={styles.container}>
          <Text style={styles.text}>Plant Name: {plantName}</Text>
          <Text style={styles.text}>Probability: {plantProbability}</Text>
          <Image style={styles.image} source={{ uri: plantImageURL }} />
          {/* Add more UI components to display other information */}
        </View>
      );
    }
  }

  // Handle the case where relevant properties are undefined
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Error: Invalid API response format</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default PlantImageDetail;
