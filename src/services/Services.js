import axios from 'axios';
import {BASE_URL, API_KEY} from '../constants/api_url';

export const listMovies = async num_page_in_url => {
  /*
  const API_URL = `${BASE_URL}movie/popular?api_key=${API_KEY}&page=${num_page_in_url}`;
  let response = await fetch(API_URL, {method: 'GET'});
  response = response.json();
  return response;
  */
  const response = await axios.get(
    `${BASE_URL}movie/popular?api_key=${API_KEY}&page=${num_page_in_url}`,
  );
  return response.data;
};

export const listSearchMovies = async (search_word_in_url, num_page_in_url) => {
  const response = await axios.get(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${search_word_in_url}&page=${num_page_in_url}`,
  );
  return response.data;
};

export const listDetails = async movie_id => {
  const response = await axios.get(
    `${BASE_URL}movie/${movie_id}?api_key=${API_KEY}`,
  );
  return response.data;
};
