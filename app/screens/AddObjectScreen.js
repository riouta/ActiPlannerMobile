import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

const AddObjectScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    if (id) {
      fetchObject(id);
    }
  }, []);

  const fetchObject = async (objectId) => {
    try {
      const response = await axios.get(`https://api.example.com/objects/${objectId}`);
      setName(response.data.name);
      setDescription(response.data.description);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      if (id) {
        await axios.put(`https://api.example.com/objects/${id}`, { name, description });
      } else {
        await axios.post('https://api.example.com/objects', { name, description });
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      
      <Button title={id ? "Save" : "Add"} onPress={handleSave} />

      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default AddObjectScreen;
