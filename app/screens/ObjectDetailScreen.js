import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const ObjectDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [object, setObject] = useState(null);

  useEffect(() => {
    fetchObject();
  }, []);

  const fetchObject = async () => {
    try {
      const response = await axios.get(`https://api.example.com/objects/${id}`);
      setObject(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteObject = async () => {
    try {
      await axios.delete(`https://api.example.com/objects/${id}`);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  if (!object) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{object.name}</Text>
      <Text style={styles.description}>{object.description}</Text>
      <Button title="Edit" onPress={() => navigation.navigate('EditObject', { id: object.id })} />
      <Button title="Delete" onPress={deleteObject} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default ObjectDetailScreen;
