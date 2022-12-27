import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  per_page: 15,
  key: '30692971-b147f9a702170160ab831dd90',
  image_type: 'photo',
  orientation: 'horizontal',
};

export const getImages = async (query, page) => {
  return await axios.get(`?q=${query}&page=${page}`);
};
