import React, {useState, useEffect, useContext} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import axios from 'axios';

import Item from '../components/Item';
import FavoritesModal from '../components/FavoritesModal';
import Show from '../types'

const HomeScreen: React.FC<{
  navigation: any;
}> = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState<Show[]>([]);
  const [showModal, setShowModal] = useState(false);

  async function fetchSeries(query: string) {
    setLoading(true);
    checkInternetConnection();
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${query}`,
      );

      setResults(response.data);
      setLoading(false);
    } catch (error: any) {
      Alert.alert('Something went wrong!', error.toString());
    }
  }

  const checkInternetConnection = () => {
    setTimeout(() => {
      if (loading)
        Alert.alert('Slow loading time?', 'Check your internet connection');
    }, 3000);
  };

  const handleFavorite = (show: Show) => {
    if (!favorites.includes(show)) setFavorites([...favorites, show]);
    else setFavorites(favorites.filter(s => s.name !== show.name));
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TextInput
        placeholder={'Search for a tv series'}
        onChangeText={setQuery}
        value={query}
        style={styles.input}
        onBlur={() => fetchSeries(query)}
      />
      {loading ? (
        <View style={{flexGrow: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 25, textAlign: 'center'}}>Loading ... </Text>
        </View>
      ) : (
        <ScrollView style={{flexGrow: 1, marginHorizontal: 20}}>
          {results.length <= 0 ? (
            <Text>No shows found</Text>
          ) : (
            results.map((r: {show: {name: string}}, i) => {
              return (
                <Pressable
                  onPress={() => navigation.navigate('Show', {show: r.show})}
                  key={i}>
                  <Item
                    show={r.show}
                    handleFavorite={(s: Show) => handleFavorite(s)}
                    isFavorite={favorites.includes(r.show)}
                  />
                </Pressable>
              );
            })
          )}
        </ScrollView>
      )}
      <Pressable
        onPress={() => setShowModal(!showModal)}
        style={{position: 'absolute', bottom: 50, right: 20, ...styles.button}}>
        <Text>Show Favorites</Text>
      </Pressable>
      <FavoritesModal
        favorites={favorites}
        showModal={showModal}
        setShowModal={setShowModal}
        handleFavorite={handleFavorite}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  input: {
    height: 50,
    margin: 20,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: 'white',
    fontSize: 18,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 10,
  },
});

export default HomeScreen;
