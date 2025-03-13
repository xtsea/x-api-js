// AkenoX API

import axios from 'axios';

export const UserAdd = async (user_id) => {
  const options = {
    method: 'GET',
    url: 'your api endpoint',
    params: {
      something: user_id
    }
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
