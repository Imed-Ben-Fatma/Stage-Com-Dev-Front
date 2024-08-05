import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:3000';
export const createNote = async (note,post_id,reservation_id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/notes`,
        {
            note:{
                note: note,
                post_id: post_id,
                reservation_id: reservation_id
                } 
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
  

  export const getnote = async (reservation_id, user_id ) => {
    try {
      const role = Cookies.get('role');
      const token = Cookies.get('token');
      let url = `${API_BASE_URL}/noteByReservation?reservation_id=${reservation_id}&user_id=${user_id}`;
      

      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching note:', error);
      throw error;
    }
  };