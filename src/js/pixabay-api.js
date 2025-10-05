// pixabay-api.js
import axios from 'axios';

const API_KEY = '52586947-52be226ea0996a0c8fac5fdee';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });

    return response.data;
  } catch (error) {
    console.error('AxiosError:', error);
    return { hits: [], totalHits: 0 };
  }
}
