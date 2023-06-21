import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {listMovies, listSearchMovies} from '../services/Services';
import {IMAGE_URL} from '../constants/api_url';
import Loading from './Loading';
import MoviesGrid from './MoviesGrid';

const widthSreen = Dimensions.get('screen').width;

const MoviesList = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);
  const [searchWord, setSearchWord] = useState('');
  const [wordKeeper, setWordKeeper] = useState('');
  //const [searchVerify, setSearchVerify] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getMoviesList = async () => {
      /*
      const movieslist = await listMovies(page);
      setMovies(movieslist.results);
      setLoading(false);
      */
      await listMovies(page).then(data_received => {
        setMovies(data_received.results);
        setTotalPages(data_received.total_pages);
        setLoading(false);
      });
    };
    const getSearchedMoviesList = async () => {
      await listSearchMovies(searchWord, page).then(data_received => {
        setMovies(data_received.results);
        setTotalPages(data_received.total_pages);
        setLoading(false);
      });
    };
    /*
    searchVerify
      ? (searchWord === '' ? getSearchedMoviesList() : getMoviesList(),
        setSearchVerify(false))
      : getMoviesList();
      */
    searchWord === '' ? getMoviesList() : getSearchedMoviesList();
    //getMoviesList();
  }, [page, searchWord]);

  return loading ? (
    <Loading
      loadingText={
        (searchWord ? '"' + searchWord + '" movies' : 'all movies') +
        ' page ' +
        page
      }
    />
  ) : (
    <SafeAreaView>
      <View style={[styles.centerSearchAndPage, styles.centerItems]}>
        <TextInput
          style={styles.textInput}
          placeholder="All Movies"
          returnKeyType={'done'}
          value={wordKeeper}
          onChangeText={text => {
            setWordKeeper(text);
          }}
        />
        <Button
          title="Search"
          onPress={() => {
            setSearchWord(wordKeeper);
            setPage(1);
          }}
        />
      </View>
      <View style={[{flex: 1}, styles.centerOnlyListItems]}>
        <ImageBackground
          source={require('../assets/list_image_background.jpg')}
          resizeMode="cover">
          <FlatList
            style={{width: widthSreen}}
            contentContainerStyle={styles.centerItems}
            keyExtractor={item => item.id}
            data={movies}
            numColumns={2}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('NavigateToMovie', {
                    movie_details: item,
                  });
                }}>
                <MoviesGrid
                  movie_image={
                    item.poster_path ? IMAGE_URL + item.poster_path : ''
                    //IMAGE_URL + item.poster_path
                  }
                  movie_title={item.title}
                />
              </TouchableOpacity>
            )}
          />
        </ImageBackground>
      </View>
      <View style={[styles.centerSearchAndPage, styles.centerItems]}>
        <Button
          disabled={page === 1}
          onPress={() => {
            setPage(page - 1);
          }}
          title="<<<"
        />
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          {'      '}
          page {page} of {totalPages}
          {'      '}
        </Text>
        <Button
          disabled={page === totalPages}
          onPress={() => {
            setPage(page + 1);
          }}
          title=">>>"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centerSearchAndPage: {
    width: widthSreen,
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  centerItems: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    width: 150,
    textAlign: 'center',
    marginRight: 10,
    height: '80%',
  },
  disabledButton: {
    color: 'gray',
  },
});

export default MoviesList;
