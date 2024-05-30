import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';
import { Camera } from 'expo-camera';

const AddObjectScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hasPermission, setHasPermission] = useState(null);

  const addObject = async () => {
    try {
      await axios.post('https://api.example.com/objects', { name, description });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
      <Button title="Add" onPress={addObject} />
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} />
    </View>
    </View>
  );
};


export default AddObjectScreen;
