import React from 'react';

import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import Show from '../types'

const Item: React.FC<{
  show: Show;
  handleFavorite: Function;
  isFavorite: boolean
}> = ({show, handleFavorite, isFavorite}) => {
  return (
    <View style={styles.card}>
      <View style={styles.wrap}>
        <View style={styles.imgContainer}>
          {show.image?.medium ? (
            <Image
              source={{uri: show.image.medium}}
              style={{width: 80, height: 120}}
            />
          ) : (
            <Text style={{textAlign: 'center'}}>No image found</Text>
          )}
        </View>
        <View style={{flex: 1}}>
          <Pressable style={styles.favorite} onPress={() => handleFavorite(show)}>
            <Text style={{fontSize: 24, color: isFavorite ? "orange" : "gray"}}>★</Text>
          </Pressable>
          <View>
            <Text style={styles.name}>{show.name}</Text>
            {show.rating?.average && <Text style={styles.h2}>Rating: {show.rating?.average}</Text>}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContainer: {
    height: 120,
    width: 80,
    marginRight: 20,
    justifyContent: 'center',
    backgroundColor: 'lightsalmon',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    flexShrink: 1,
  },
  h2: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  favorite: {
    backgroundColor: '#f0f0f0',
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    marginLeft: 'auto',
  },
});

export default Item;
