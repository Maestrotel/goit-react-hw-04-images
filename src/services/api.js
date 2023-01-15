import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31782364-fd6d161c87d4314466595830e';

const receiveImages = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
  },
});

export const getPixabayImages = async (query, page) => {
  // const { data } = await receiveImages.get(`?q=${query}&page=${page}`);
  const { data } = await receiveImages.get('', { params: { q: query, page } });
  return data;
};
