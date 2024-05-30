import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
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

  if (!object) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>{object.name}</Text>
      <Text>{object.description}</Text>
      <Button title="Edit" onPress={() => navigation.navigate('EditObject', { id: object.id })} />
    </View>
  );
};

export default ObjectDetailScreen;
