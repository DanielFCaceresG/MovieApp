import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
  ImageBackground,
} from 'react-native';

import {LARGE_IMAGE_URL} from '../constants/api_url';
import {listDetails} from '../services/Services';

import Loading from '../components/Loading';
import {SafeAreaView} from 'react-native-safe-area-context';

const Movie = ({route}) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMoviesDetails = async () => {
      await listDetails(route.params.movie_details.id).then(data_received => {
        setDetails(data_received);
        setLoading(false);
      });
    };
    getMoviesDetails();
  }, [route.params.movie_details.id]);
  return loading ? (
    <Loading loadingText={'"' + route.params.movie_details.title + '"'} />
  ) : (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/movie_image_background.jpg')}>
        <ScrollView>
          <View>
            <Image
              style={styles.imageBox}
              source={
                route.params.movie_details.backdrop_path
                  ? {
                      uri: `${LARGE_IMAGE_URL}${route.params.movie_details.backdrop_path}`,
                    }
                  : require('../assets/image_not_found.jpg')
              }
            />
            <View style={{marginHorizontal: 10}}>
              {/*{getImage({route})}*/}
              {getTitle({route})}
              {getOverwiew({route})}
              {getGenres(details)}
              {getRateAndReviews({route})}
              {getReleaseDate({route})}
              {getPopularity({route})}
              {getProductionCompanies(details)}
              {getHomePageLink(details)}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
/*
const getImage = props => {
  return props.route.params.movie_details.backdrop_path ? (
    <Image
      style={styles.imageBox}
      source={{
        uri: `${LARGE_IMAGE_URL}${props.route.params.movie_details.backdrop_path}`,
      }}
    />
  ) : (
    <Image
      style={styles.imageBox}
      source={require('../assets/image_not_found.jpg')}
    />
  );
};
*/
const getTitle = props => {
  return props.route.params.movie_details.title ? (
    <Text style={[{fontSize: 20}, styles.titleAndNullText, styles.textColor]}>
      {props.route.params.movie_details.title}
    </Text>
  ) : (
    <Text style={styles.titleText}>Not registered title</Text>
  );
};

const getOverwiew = props => {
  return props.route.params.movie_details.overview ? (
    <Text style={[{textAlign: 'justify'}, styles.textColor]}>
      <Text style={styles.boldText}>Overview: </Text>
      {props.route.params.movie_details.overview}
    </Text>
  ) : (
    <Text style={[styles.titleAndNullText, styles.textColor]}>
      No description
    </Text>
  );
};

// SIN MENSAJE DE 'NO ENCONTRADO'

const getGenres = details_received => {
  if (details_received.genres.length) {
    var genres_text = [];
    for (const index in details_received.genres) {
      index > 0
        ? (genres_text = [
            ...genres_text,
            ', ',
            details_received.genres[index].name,
          ])
        : (genres_text = [...genres_text, details_received.genres[index].name]);
      //genres_text.push(details_received.genres[index].name);
    }
    return (
      <Text style={styles.textColor}>
        <Text style={styles.boldText}>Genre(s): </Text>
        {genres_text}
      </Text>
    );
  }
  /*
  else {
    return (
      <Text style={[styles.titleAndNullText, styles.textColor]}>
        Not categorized
      </Text>
    );
  }
  */
};

const getRateAndReviews = props => {
  if (
    props.route.params.movie_details.vote_average ||
    props.route.params.movie_details.vote_count
  ) {
    return (
      <Text style={styles.textColor}>
        <Text style={styles.boldText}>Rate: </Text>
        {props.route.params.movie_details.vote_average} with{' '}
        {props.route.params.movie_details.vote_count} reviews
      </Text>
    );
  }
};

const getReleaseDate = props => {
  if (props.route.params.movie_details.release_date) {
    return (
      <Text style={styles.textColor}>
        <Text style={styles.boldText}>Release Date: </Text>
        {props.route.params.movie_details.release_date}
      </Text>
    );
  }
};

const getPopularity = props => {
  if (props.route.params.movie_details.popularity) {
    return (
      <Text style={styles.textColor}>
        <Text style={styles.boldText}>Popularity: </Text>
        {props.route.params.movie_details.popularity}
      </Text>
    );
  }
};

const getProductionCompanies = details_received => {
  if (details_received.production_companies.length) {
    var production_companies_text = [];
    for (const index in details_received.production_companies) {
      index > 0
        ? (production_companies_text = [
            ...production_companies_text,
            ', ',
            details_received.production_companies[index].name,
          ])
        : (production_companies_text = [
            ...production_companies_text,
            details_received.production_companies[index].name,
          ]);
    }
    return (
      <Text style={styles.textColor}>
        <Text style={styles.boldText}>Production Company(ies): </Text>
        {production_companies_text}
      </Text>
    );
  }
};

const getHomePageLink = details_received => {
  if (details_received.homepage) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.textColor, styles.boldText]}>More info: </Text>
        <Text
          style={{flex: 1, color: 'cyan', textDecorationLine: 'underline'}}
          onPress={() => {
            Linking.openURL(details_received.homepage);
          }}>
          {details_received.homepage}
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  imageBox: {
    width: '100%',
    height: 200,
  },
  titleAndNullText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  textColor: {
    color: 'white',
  },
});

export default Movie;
