import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:3000';

export const fetchReservationDate = async (postId) => {
  try {
    const authToken = Cookies.get('token');
    const response = await axios.get(`${API_BASE_URL}/reservations_by_post`, {
      params: {
        post_id: postId
      },
      headers: {
        Authorization: authToken
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reservation dates:', error);
    throw error;
  }
};

export const fetchReservationByUser = async (userId) => {
  try {
    const authToken = Cookies.get('token');
    const response = await axios.get(`${API_BASE_URL}/reservations_by_user?user_id=${userId}`, {

      headers: {
        Authorization: authToken
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reservation dates:', error);
    throw error;
  }
};

export const createReservation = async (post_id, startDate, endDate, nbrVoyageurs) => {
  try {
    const authToken = Cookies.get('token');
    const response = await axios.post(
      `${API_BASE_URL}/reservations`,
      {
        post_id: post_id,
        dateArrivee: startDate,
        dateDepart: endDate,
        nbrVoyageurs: nbrVoyageurs
      },
      {
        headers: {
          Authorization: authToken
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const updateReservationStatus = async (reservation_id, status) => {
  try {
    const authToken = Cookies.get('token');
    const response = await axios.patch(
      `${API_BASE_URL}/reservations_update_statut`, 
      {
        statut: status,
        reservation_id: reservation_id,
      },
      {
        headers: {
          Authorization: `${authToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating reservation status:', error);
    throw error;
  }
};

export const fetchReservationForUser = async () => {
  try {
    const authToken = Cookies.get('token');
    const response = await axios.get(`${API_BASE_URL}/reservations_by_current_user`, {
      headers: {
        Authorization: `${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reservation dates:', error.response ? error.response.data : error.message);
    throw error;
  }
};