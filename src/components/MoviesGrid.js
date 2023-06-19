import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

const MoviesGrid = props => {
  return (
    <View style={styles.gridBox}>
      <Image
        style={styles.imageBox}
        source={
          props.movie_image
            ? {uri: props.movie_image}
            : require('../assets/image_not_found.jpg')
        }
      />
      <Text style={styles.textBox}>
        {' '}
        {props.movie_title ? props.movie_title : 'Not registered title'}{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gridBox: {
    flex: 1,
    height: '100%',
    margin: 10,
    elevation: 5,
  },
  imageBox: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  textBox: {
    width: 150,
    textAlign: 'center',
    color: 'white',
    marginTop: 5,
  },
});

export default MoviesGrid;
