import axios from 'axios';

export const getImages = async (page, filter) => {
  return await axios('https://pixabay.com/api/', {
    params: {
      q: filter,
      key: '40728025-816c059da6666ef8bc43bfdc5',
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
};
