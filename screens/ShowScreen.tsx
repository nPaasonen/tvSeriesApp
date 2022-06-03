import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, Image, View} from 'react-native';

const ShowScreen: React.FC<{
  navigation: any;
  route: any;
}> = ({navigation, route}) => {
  const {show} = route.params;

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.top}>
        <View style={styles.imgContainer}>
            {show.image?.medium ? (
            <Image source={{uri: show.image.medium}} style={{width: 120, height: 180}} />
            ) : (
            <Text style={{textAlign: 'center'}}>No image found</Text>
            )}
        </View>
        <View>
          <Text style={styles.title}>{show.name}</Text>
          <Text> {show.rating?.average ? "Rating: "+ show.rating.average : "No rating"}</Text> 
        </View>
      </View>
      <View style={{marginTop: 40}}>
          <Text>{show.summary ? show.summary : "No summary available"}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20
  },
  top: {
    flexDirection: "row",
    flexShrink: 1
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    flexShrink: 1
  },
  imgContainer: {
    height: 180,
    width: 120,
    marginRight: 20,
    justifyContent: 'center',
    backgroundColor: 'lightsalmon',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default ShowScreen;
