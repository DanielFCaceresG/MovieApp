import React from 'react';
import {View} from 'react-native';

import MovieList from '../components/MoviesList';

const Home = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MovieList navigation={navigation} />
    </View>
  );
};

export default Home;
