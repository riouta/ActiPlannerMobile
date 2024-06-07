import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [objects, setObjects] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadState = async () => {
        const savedSearch = await AsyncStorage.getItem('search');
        if (savedSearch) {
          setSearch(savedSearch);
          fetchObjects(savedSearch);
        }
        else {
          fetchObjects();
        }
      };
      loadState();
    }, []);

    const fetchObjects = async (query = '') => {
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
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChangeText={handleSearchChange}
      />

      <FlatList
        data={objects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Button title="View" onPress={() => navigation.navigate('ObjectDetail', { id: item.id })} />
          </View>
        )}
      />
      
      <Button title="Add Object" onPress={() => navigation.navigate('AddObject')} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  itemContainer: {
    marginBottom: 16,
  },
  itemName: {
    fontSize: 18,
  },
});

export default HomeScreen;
