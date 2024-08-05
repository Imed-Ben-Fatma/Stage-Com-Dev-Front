import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:3000';

export const getCommentaire = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/commentaires/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching commentaire:', error);
    throw error;
  }
};


export const createCommentaire = async (commentaire,post_id,reservation_id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/commentaires`,
      {
        commentaire: commentaire,
        post_id: post_id,
        reservation_id: reservation_id
      },{
      headers: {
        Authorization: Cookies.get('token')
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating commentary:', error);
    throw error;
  }
};

