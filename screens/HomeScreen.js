import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [objects, setObjects] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadState = async () => {
        const savedSearch = await AsyncStorage.getItem('search');
        if (savedSearch) {
          setSearch(savedSearch);
          fetchObjects(savedSearch);
        }
      };
      loadState();
    }, []);
    

    const fetchObjects = async () => {
        setLoading(true);
        try {
        const response = await axios.get('https://api.example.com/objects');
        setObjects(response.data);
        } catch (error) {
        console.error(error);
        }
        setLoading(false);
    };

    const handleSearchChange = async (text) => {
        setSearch(text);
        await AsyncStorage.setItem('search', text);
        fetchObjects(text);
      };
    if (loading) {
    return <Text>Loading...</Text>;
    }

  return (
    <View>
      <FlatList
        data={objects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="View" onPress={() => navigation.navigate('ObjectDetail', { id: item.id })} />
          </View>
        )}
      />
      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={handleSearchChange}
        onSubmitEditing={fetchObjects}
      />
      <Button title="Add Object" onPress={() => navigation.navigate('AddObject')} />
    </View>
  );
};

export default HomeScreen;
