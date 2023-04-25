import axios from 'axios';
import { page } from './index';

const API_KEY = '35639448-d856c19f58ebd88d37f926e40';
const perPage = 40;

export async function getPictures(searchQuery) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
