
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DATA = [
  { id: 1, lastname: 'Smith' },
  { id: 2, lastname: 'Johnson' },
];

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(DATA);
  }, []);

  const executeSearch = (search) => {
    const searchArray = DATA.filter((item) => item.lastname.startsWith(search));
    setItems(searchArray);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Search executeSearch={executeSearch} />
      <FlatList
        data={items}
        renderItem={({ item }) => <Row person={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}

function Row({ person }) {
  return (
    <View>
      <Text>{person.lastname}</Text>
    </View>
  );
}

function Search({ executeSearch }) {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.searchBox}>
      <TextInput
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search"
        returnKeyType="search"
        onSubmitEditing={() => executeSearch(search)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    padding: 100,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});