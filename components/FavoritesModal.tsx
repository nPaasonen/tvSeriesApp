import React, {useState, useEffect} from 'react';

import {StyleSheet, Text, View, Modal, Pressable, ScrollView} from 'react-native';
import Item from './Item'
import Show from '../types'

const FavoritesModal: React.FC<{
  showModal: boolean;
  favorites: Array<Show>;
  setShowModal: Function;
  navigation: {
      navigate: Function
  };
  handleFavorite: Function
}> = ({showModal, setShowModal, favorites, navigation, handleFavorite}) => {
  return (
    <Modal
    visible={showModal}
    transparent={true}
    animationType={'slide'}
    onRequestClose={() => {
      setShowModal(!showModal);
    }}>
    <View style={styles.modal}>
      <Text style={{fontSize: 24, marginBottom: 20}}>Favorite Shows</Text>
      <ScrollView>
        {favorites.length <= 0 && <Text>No favorites to show</Text>}
        {favorites.length > 0 &&
          favorites.map((show: Show, i) => {
            return (
              <Pressable
                key={i}
                onPress={() => {
                  setShowModal(!showModal);
                  navigation.navigate('Show', {show: show});
                }}>
                <Item
                  show={show}
                  handleFavorite={(s: object) => handleFavorite(s)}
                  isFavorite={favorites.includes(show)}
                />
              </Pressable>
            );
          })}
      </ScrollView>
      <Pressable
        onPress={() => setShowModal(!showModal)}
        style={styles.button}>
        <Text>Close modal</Text>
      </Pressable>
    </View>
  </Modal>
  );
};

const styles = StyleSheet.create({
    modal: {
        height: '95%',
        marginTop: 'auto',
        backgroundColor: '#eee',
        borderRadius: 20,
        paddingVertical: 35,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingHorizontal: 20,
      },
      button: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: 10,
      },
});

export default FavoritesModal;
