import axios from 'axios';
import Cookies from 'js-cookie';




const API_BASE_URL = 'http://localhost:3000';


export const fetchPosts = async (page = null, typeLogement = null) => {
  try {
    const config = {
      params: {}
    };

    if (page !== null) {
      config.params.page = page;
    }

    if ((typeLogement !== null) &&(typeLogement!== 'tous les logements') ){
      config.params.type = typeLogement;
    }

    const response = await axios.get(`${API_BASE_URL}/posts`, config);
    const data = response.data;
    
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const archiverPost = async (post_id) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/posts/${post_id}/update_archived`,{}, {
        headers: {
          'Authorization': Cookies.get('token')
        }
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error archiving post:', error);
    throw error;
  }
};

export const blockedPost = async (post_id) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/posts/${post_id}/update_blocked`,{},
      {
        headers: {
          'Authorization': Cookies.get('token')
        }
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error blocking post:', error);
    throw error;
  }
};


export const fetchPostsByCurrentUser = async (id=0,filter=false) => {
  try {
    const authToken = Cookies.get('token');

    const response = await axios.get(`${API_BASE_URL}/posts_by_user?user_id=${id}&en_cours_de_traitement=${filter}`, {
      headers: {
        'Authorization': Cookies.get('token')
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching posts by current user:', error);
    throw error;
  }
};


export const fetchPostDetailes = async (postId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}`, {
      headers: {
        'Authorization': Cookies.get('token')
      }
    });
    const data = response.data
    
    return data
      
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};


export const addPost = async (
  titre, prix, description, nbrChambres, nbrLits, nbrSallesDeBains,
  regles, logementType, typePlace, rue, ville, pays, localisationGPS, images, equipements
) => {
  try {
    const equipementsAttributes = Object.entries(equipements).map(([key, value]) => ({
      'nom': key,
      'description': value
    }));

    // Create FormData object
    const formData = new FormData();

    // Append text data
    formData.append('titre', titre);
    formData.append('prix', prix);
    formData.append('description', description);
    formData.append('nbrChambres', nbrChambres);
    formData.append('nbrLits', nbrLits);
    formData.append('nbrSalleDeBain', nbrSallesDeBains);
    formData.append('regles', regles);
    formData.append('type_logements[type]', logementType);
    formData.append('type_logements[typePlace]', typePlace);
    formData.append('adresse_attributes[rue]', rue);
    formData.append('adresse_attributes[ville]', ville);
    formData.append('adresse_attributes[pays]', pays);
    formData.append('adresse_attributes[localisationGPS]', localisationGPS);

    // Append equipements attributes
    equipementsAttributes.forEach((equipement, index) => {
      formData.append(`equipements_attributes[${index}][nom]`, equipement.nom);
      formData.append(`equipements_attributes[${index}][description]`, equipement.description);
    });
    console.log('*******',images)
    // Append images
    images.map((image) => {
      formData.append('images[]', image);
      console.log('====>',image);
    });
    //formData.append('images', images)
    
    // Send POST request with FormData
    const response = await axios.post(`${API_BASE_URL}/posts`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': Cookies.get('token')
      }
    });

    const responseData = response.data;
    console.log(responseData);
  } catch (error) {
    console.error('Error adding post:', error.message);
  }
};



export const updatePost = async (
  id, titre, prix, description, nbrChambres, nbrLits, nbrSallesDeBains,
  regles, logementType, typePlace, equipements,imagesRemove,images
) => {
  try {


    // Create FormData object
    const formData = new FormData();

    // Append text data
    formData.append('titre', titre);
    formData.append('prix', prix);
    formData.append('description', description);
    formData.append('nbrChambres', nbrChambres);
    formData.append('nbrLits', nbrLits);
    formData.append('nbrSallesDeBains', nbrSallesDeBains);
    formData.append('regles', regles);
    formData.append('type_logement[type]', logementType);
    formData.append('type_logements[typePlace]', typePlace);

    // Append equipements attributes
    equipements.forEach((equipement, index) => {
      formData.append(`equipements_attributes[${index}][nom]`, equipement.nom);
      formData.append(`equipements_attributes[${index}][description]`, equipement.description);
    });

    imagesRemove.forEach((id) => {
      formData.append(`images_remove[]`, id);
    });

    images.map((image) => {
      formData.append('images[]', image);
    });

    // Send PATCH request with FormData
    const response = await axios.patch(`${API_BASE_URL}/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': Cookies.get('token')
      }
    });

    const responseData = response;
    console.log('Post updated successfully:', responseData);
  } catch (error) {
    console.error('Error updating post:', error.message);
  }
};


export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/posts/${postId}`, {
      headers: {
        'Authorization': `${Cookies.get('token')}` 
      }
    });

    return response.data; 
    
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error; 
  }
};