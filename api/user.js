import axios from 'axios';
import Cookies from 'js-cookie';


const API_BASE_URL = 'http://localhost:3000';

export const fetchAllOwners = async () => {
    try {
      const authToken = Cookies.get('token');
      const response = await axios.get(`${API_BASE_URL}/users/allOwners`, {
        headers: {
          'Authorization': `${authToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts by current user:', error);
      throw error;
    }
  };



  export const fetchAllUsers = async () => {
    try {
      const authToken = Cookies.get('token');
      const response = await axios.get(`${API_BASE_URL}/users/allUsers`, {
        headers: {
          'Authorization': `${authToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts by current user:', error);
      throw error;
    }
  };



export const updateOwnerForAdmin = async (id,name,email,telephone,status) => {
    
    const token = Cookies.get('token');
    try {
        const response = await axios.patch(`${API_BASE_URL}/users/updateForAdmin`, 
        {
          id: id,
          name: name,
          email: email,
          telephone: telephone,
          status: status
        }, 
        {
            headers: { 
                'Authorization': token,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating data:", error);
    }
};



export const searchUsers = async (search) => {
  try {
    const authToken = Cookies.get('token');
    const response = await axios.get(`${API_BASE_URL}/users/search?search=${search}&role=user`, {
      headers: {
        'Authorization': `${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts by current user:', error);
    throw error;
  }
};



export const getUser = async (id) => {
  try {
    const authToken = Cookies.get('token');
    const response = await axios.get(`${API_BASE_URL}/users/byId?user_id=${id}`, {
      headers: {
        'Authorization': `${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts by current user:', error);
    throw error;
  }
};


export const searchOwners = async (search) => {
  try {
    const authToken = Cookies.get('token');
    const response = await axios.get(`${API_BASE_URL}/users/search?search=${search}&role=owner`, {
      headers: {
        'Authorization': `${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts by current user:', error);
    throw error;
  }
};




export const deleteUser = async (id) => {
  try {
    const authToken = Cookies.get('token');
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`, {
      headers: {
        'Authorization': `${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error delete user:', error);
    throw error;
  }
};


export const postByUser = async () => {
  try {
    const authToken = Cookies.get('token');
    const response = await axios.get(`${API_BASE_URL}/posts_by_user`, {
      headers: {
        'Authorization': `${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error delete user:', error);
    throw error;
  }
};