'use client'
import Image from "next/image";
import Cookies from "js-cookie";
import { Page403 } from "@/app/components/page403";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

import { useState ,useEffect} from "react";
import {updatePost,fetchPostDetailes}from "@/api/posts"
import Loading from "@/app/components/pageLoading";
import { useRouter } from "next/navigation";

const API_BASE_URL = 'http://localhost:3000';


const logement_types = [
  'Appartement', 'Maison', 'Chambre privée', 'Chambre partagée', 'Studio', 'Villa', 'Bungalow',
  'Chalet', 'Cabane', 'Maison de ville', 'Gîte', 'Hôtel', 'Auberge', 'Péniche', 'Tente', 'Tipi',
  'Yourte', 'Roulotte', 'Igloo', 'Refuge', 'Tour', 'Ferme', 'Château', 'Résidence secondaire',
  'Complexe hôtelier', 'Bed and breakfast'
]

  const types_place = ['Logement entier', 'Chambre privée', 'Espace partage']

  const list_equipements=[
    'Wi-Fi','Télévision','Chauffage','Climatisation','Eau chaude','Réfrigérateur','Four',
    'Micro-ondes','Cuisinière','Ustensiles de cuisine','Bouilloire','Machine à café','Jacuzzi',
    'Grille-pain','Lave-vaisselle','Shampooing','Sèche-cheveux','Lave-linge','Fer à repasser',
    'Cintres','Draps supplémentaires','Oreillers et couvertures supplémentaires','Cheminée',
    'Détecteur de fumée','Trousse de premiers secours','Extincteur','Livres et magazines',
    'Parking','Chaise haute','Jeux de société','Piscine','Salle de sport'
  ]

export default function UpdatePost({ params }) {

  //---------------------------------------------------------------------
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleClose = () => setOpen(false); 


    const [titre, setTitre] = useState();
    const [prix, setPrix] = useState();
    const [description, setDescription] = useState();
    const [images, setImages] = useState([]);

    const [imagesAdd, setImagesAdd] = useState([]);
    const [imagesRemove, setImagesRemove] = useState([]);
  
    const [nbrChambres, setNbrChambres] = useState(0);
    const [nbrLits, setNbrLits] = useState(0);
    const [nbrSallesDeBains, setNbrSallesDeBains] = useState(0);
  
    const [logementType, setLogementType] = useState();
    const [typeEspace, setTypeEspace] = useState();
    const [regles, setRegles] = useState();
  
  
    const [equipements, setEquipements] = useState({});
    const [equipementsNom, setEquipementsNom] = useState({});
  
    const [imagePreviews, setImagePreviews] = useState([]);

    const [post, setPost] = useState();
    const [role, setRole] = useState(null);

    const routre= useRouter()
  //---------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        let roleTest = Cookies.get('role');
        if (roleTest === 'owner' || roleTest === 'admin') {
          setRole(roleTest);
        }

        const response = await fetchPostDetailes(params.postId);
        setPost(response);

        if (response) {
          setTitre(response.titre);
          setPrix(response.prix);
          setDescription(response.description);
          setImages(response.images);
          setNbrChambres(response.nbrChambres);
          setNbrLits(response.nbrLits);
          setNbrSallesDeBains(response.nbrSalleDeBain);
          setLogementType(response.type_logements);
          setTypeEspace(response.type_logements);
          setRegles(response.regles);
          setEquipements(response.equipements);
          setImagePreviews(response.images);
          const equipementsNames = {};
          response.equipements.forEach(equipement => {
            equipementsNames[equipement.nom] = true;
          });
          setEquipementsNom(equipementsNames);
        }

      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchData();
  }, [params.postId]);
  //---------------------------------------------------------------------
    if (role === null || !post) {
      console.log('---->'+post+'--- role--->'+role)

      return <div><Loading/></div>;
    }

    if (!(role=='admin' || role=='owner') ) {
      return (
        <div>
          <Page403 />
        </div>
      );
    }
  //---------------------------------------------------------------------

  const addImagesRemove = (id) => {;
    setImagesRemove([...imagesRemove, id]);
    
  };


  const removeFromImagesRemove = (id) => {
    setImagesRemove(imagesRemove.filter(imageId => imageId !== id));
    console.log('--->'+imagesRemove)
  };
  //---------------------------------------------------------------------

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImagesAdd(filesArray);


      const filePreviewsPromises = filesArray.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({ name: file.name, src: e.target.result });
          };
          reader.readAsDataURL(file);
        });
      });    Promise.all(filePreviewsPromises)
      .then((filePreviews) => {
        setImagePreviews(filePreviews);
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });

    }
  };
  //---------------------------------------------------------------------

  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'titre':
        setTitre(value);
        break;
      case 'prix':
        setPrix(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'nbrChambres':
        setNbrChambres(value);
        break;
      case 'nbrLits':
        setNbrLits(value);
        break;
      case 'nbrSallesDeBains':
        setNbrSallesDeBains(value);
        break;
      case 'typeLogement':
        setLogementType(value);
        break;
      case 'typeEspace':
        setTypeEspace(value);
        break;
      case 'regles':
        setRegles(value);
        break;
      default:
        break;
    }
  };
  //---------------------------------------------------------------------

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    
    // Mettre à jour l'état equipementsNom
    setEquipementsNom((prevEquipements) => ({
      ...prevEquipements,
      [name]: checked,
    }));
    
    // Mettre à jour l'état equipements
    setEquipements((prevEquipements) => {
      if (checked) {
        // Ajouter l'équipement si la case est cochée
        return [...prevEquipements, { nom: name, description: '' }];
      } else {
        // Supprimer l'équipement si la case est décochée
        return prevEquipements.filter(equipement => equipement.nom !== name);
      }
    });
    
    console.log(equipements);
  };
  
  const getDescription = (nom) => {
    const equipement = equipements.find(e => e.nom === nom);
    return equipement ? equipement.description : '';
  };

  const handleDescriptionChange = (event) => {
    const { name, value } = event.target;
    const equipementName = name.replace('Description', '');
  
    setEquipements((prevEquipements) =>
      prevEquipements.map((equipement) =>
        equipement.nom === equipementName
          ? { ...equipement, description: value }
          : equipement
      )
    );
  };
  




  //---------------------------------------------------------------------


 
  var handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(
        params.postId,titre, prix, description, nbrChambres, nbrLits, nbrSallesDeBains,
        regles, logementType, typeEspace, equipements,imagesRemove,imagesAdd
        
      )
      
      routre.push(`/post/${params.postId}/?Message= Votre poste a été mis à jour.`)
      console.log('update added successfully');
    } catch (error) {
      console.error('Error adding post:', error.message);
    }
  };
  //---------------------------------------------------------------------API_BASE_URL

  const getImageSrc = (images) => images && images.url ? `${API_BASE_URL}/${images.url}` : '/images/unnamed.png';
   
 
  return (
    <div className="bg-white dark:bg-gray-800 p-5" >
    <form onSubmit={ handleSubmit} >
      <div>
        
        <h2 className=" my-5 text-4xl font-semibold font-sans leading-7 text-gray-900 dark:text-gray-200">
          Update post
        </h2>




{/* -------------------------------- */ }


  

    
    <div className=" relative container mx-auto p-4 lg:p-4">
    <div className="absolute bottom-7 right-7  ">
        <Button type="button" onClick={handleOpen} className=" flex items-center justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none rounded-full p-0  h-11 w-11 ">
          <svg class="h-8 w-8 text-white"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="5" r="1" />  <circle cx="12" cy="19" r="1" /></svg>
        </Button>
      </div>

      <dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="w-full h-full fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      >
      
        <Card className="mx-auto h-auto w-3/4   top-28 rounded-md">
            <div className=" absolute top-0 right-0 " onClick={handleClose}>
                <button type="button" className="  w-10 h-10 bg-white rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100">                
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <CardBody >

                <Typography variant="h4" color="blue-gray">
                    Images
                </Typography>
                <div className="overflow-y-auto h-[26rem] mt-3 px-2">

                <div className="grid grid-cols-2 gap-4">
                    {images.map((image) => (
                      <div className="relative" >
                        <div onClick={()=>addImagesRemove(image.id)} className="absolute top-1 right-1 hover:bg-red-500  bg-red-200 rounded-full " >
                          <svg class="h-7 w-7 text-red-500 hover:text-red-100 "  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </div>

                        
                        {imagesRemove.includes(image.id) && (
                          <div className="absolute top-0 right-0 bottom-0 left-0 bg-slate-500 bg-opacity-60">                        
                            <div onClick={()=>removeFromImagesRemove(image.id)} className="absolute top-1 right-1 hover:bg-teal-500  bg-teal-200 rounded-full " >
                            <svg class="h-7 w-7 text-teal-700 hover:text-teal-100 "  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="3"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="5" y1="12" x2="19" y2="12" /></svg>                            </div>
                          </div>
                        )}

                          <img
                            key={image.id} // Assurez-vous d'ajouter une clé unique pour chaque image
                            src={getImageSrc(image)}
                            alt={`Image ${image.id}`} // Ajoutez un attribut alt pour l'accessibilité
                            className=" w-full rounded-lg shadow-lg " // Ajoutez des classes pour styliser l'image
                          />
                        
                      </div>
                    ))}
                  </div>

                  <div className="m-5">

                    <section className="container items-center ">
                      <div className=" bg-white rounded-lg shadow-md overflow-hidden items-center">
                        <div className="px-4 py-6">
                          <div
                            id="image-preview"
                            className=" p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
                            onClick={() => document.getElementById('imagesAdd').click()}
                          >
                            <input
                              id="imagesAdd"
                              name="imagesAdd"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              multiple
                              onChange={handleImageChange}

                            />
                            <label htmlFor="upload" className="cursor-pointer">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-8 h-8 text-gray-700 mx-auto mb-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                />
                              </svg>
                              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                                Upload pictures
                              </h5>
                              <p className="font-normal text-sm text-gray-400 md:px-6">
                                Choose photos. Each photo size should be less than <b className="text-gray-600">2mb</b>
                              </p>
                              <p className="font-normal text-sm text-gray-400 md:px-6">
                                and should be in <b className="text-gray-600">JPG, PNG, or GIF</b> format.
                              </p>
                            </label>
                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 ">
                              {imagePreviews.map((preview, index) => (
                                <div key={index}>
                                  <img
                                    src={preview.src}
                                    alt={preview.name}
                                    className="max-h-48 rounded-lg mx-auto mb-2"
                                  />
                                  <span className="text-gray-500 bg-gray-200">{preview.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-center" onClick={() => document.getElementById('imagesAdd').click()}>
                            <div className="w-full">
                              <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                                <span className="text-center ml-2" >Upload</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                </div>


                
            </CardBody>

          </Card>

      </dialog>
  
{/* -------------------------------- */ }
      
      <div className="-m-1 flex flex-wrap md:-m-2">
        
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={getImageSrc(images[0])}
            />
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={getImageSrc(images[1])}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={getImageSrc(images[2])}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={getImageSrc(images[3])}
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt="gallery"
              className="block h-full w-full rounded-lg object-cover object-center"
              src={getImageSrc(images[4])}
            />
          </div>
        </div>
      </div>
    </div>
      {/* -------------------------------- */ }
        <div className="border-t border-gray-400 p-5">
          <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                Titre
                </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="text" name="titre" id="titre" autoComplete="titre" 
                  value={titre}   onChange={handleInputChange}
                  className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 focus:ring-0 text-base sm:leading-6" 
                  placeholder="Titre" />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                Prix par nuit
                </label>
                <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="number" name="prix" id="prix" autoComplete="prix" 
                  onChange={handleInputChange}
                  value={prix}
                  className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 focus:ring-0 text-base sm:leading-6" placeholder="100" />
                </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                Description
                </label>
              <div className="mt-2">
                <textarea id="about" name="description" rows={3} 
                onChange={handleInputChange}
                value={description}
                className="block w-full bg-transparent rounded-md border-0 p-2 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6" />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                Images
                </label>
              <div className="m-5">


              <section className="container items-center ">
      <div className=" bg-white rounded-lg shadow-md overflow-hidden items-center">
        <div className="px-4 py-6">
          <div
            id="image-preview"
            className=" p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
            onClick={() => document.getElementById('images').click()}
          >
            <input
               id="images"
               name="images"
               type="file"
               className="hidden"
               accept="image/*"
               multiple
               onChange={handleImageChange}

            />
            <label htmlFor="upload" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-gray-700 mx-auto mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                Upload pictures
              </h5>
              <p className="font-normal text-sm text-gray-400 md:px-6">
                Choose photos. Each photo size should be less than <b className="text-gray-600">2mb</b>
              </p>
              <p className="font-normal text-sm text-gray-400 md:px-6">
                and should be in <b className="text-gray-600">JPG, PNG, or GIF</b> format.
              </p>
            </label>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3 ">
              {imagePreviews.map((preview, index) => (
                <div key={index}>
                  <img
                    src={preview.src}
                    alt={preview.name}
                    className="max-h-48 rounded-lg mx-auto mb-2"
                  />
                  <span className="text-gray-500 bg-gray-200">{preview.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center" onClick={() => document.getElementById('images').click()}>
            <div className="w-full">
              <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                <span className="text-center ml-2" >Upload</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
              </div>
            </div>
          </div>
        </div>
      {/* --------------Chambres------------------ */ }
        <div className="border-t border-gray-400 p-5">
          <h2 className="block font-sans text-3xl font-semibold leading-6 text-gray-900 dark:text-gray-200">
            Chambres
          </h2>
          <div className="p-5" >
            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              
              <div className="col-span-2">
                <label htmlFor="about" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Nombre des chambres
                </label>
                  <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="number" name="nbrChambres" id="nbrChambres" autoComplete="nbrChambres" 
                    onChange={handleInputChange}
                    value={nbrChambres}
                    className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 focus:ring-0 text-base sm:leading-6" placeholder="0" />
                  </div>
              </div>

              <div className="col-span-2">
                <label htmlFor="about" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Nombre des lits
                </label>
                  <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="number" name="nbrLits" id="nbrLits" autoComplete="nbrLits" 
                    onChange={handleInputChange}
                    value={nbrLits}
                    className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 focus:ring-0 text-base sm:leading-6" placeholder="0" />
                  </div>
              </div>


              <div className="col-span-2">
                <label htmlFor="about" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Nombre de salles de bains
                </label>
                  <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="number" name="nbrSallesDeBains" id="nbrSallesDeBains" autoComplete="nbrSallesDeBains" 
                    onChange={handleInputChange}
                    value={nbrSallesDeBains}
                    className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 focus:ring-0 text-base sm:leading-6" placeholder="0" />
                  </div>
              </div>
            </div>
          </div>
        </div>
        

      {/* ----------------Type & Règles---------------- */ }
        <div className="border-t border-gray-400 p-5">
          <h2 className="block font-sans text-3xl font-semibold leading-6 text-gray-900 dark:text-gray-200">
          Type & Règles
          </h2>
          <div className="p-5" >
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="username" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Type de logement
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                   
                    <select name="typeLogement" id="typeLogement" 
                      onChange={handleInputChange}
                      value={logementType}
                      className="block flex-1 border-0 bg-transparent p-2  text-gray-900 dark:text-gray-300 placeholder:text-gray-400 focus:ring-0 text-base sm:leading-6">
                      {logement_types.map(type=>
                        <option className="text-gray-900 dark:text-gray-300 dark:bg-gray-700" value={type}>{type}</option>
                      )}
                    </select>
                    
                    </div>
                  </div>
                </div>
                

                <div className="sm:col-span-3">
                  <label htmlFor="username" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                    Type de l'espace
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                
                    <select name="typeEspace" id="typeEspace"
                      onChange={handleInputChange}
                      value={typeEspace}
                      className="block flex-1 border-0 bg-transparent p-2  text-gray-900 dark:text-gray-300 placeholder:text-gray-400 focus:ring-0 text-base sm:leading-6">
                      {types_place.map(type=>
                        <option className="text-gray-900 dark:text-gray-300 dark:bg-gray-700" value={type}>{type}</option>
                      )}
                    </select>
                    </div>
                  </div>
                </div>


              <div className="sm:col-span-6">
                <label htmlFor="about" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Règles
                  </label>
                <div className="mt-2">
                  <textarea id="regles" name="regles" rows={3} 
                  onChange={handleInputChange}
                  value={regles}
                  className="block w-full bg-transparent rounded-md border-0 p-2 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* --------------Localisation------------------ */ }


      {/* ---------------Equipements----------------- */ }
        <div className="border-t border-gray-400 p-5">
          <h2 className="block font-sans text-3xl font-semibold leading-6 text-gray-900 dark:text-gray-200">
            Equipements
          </h2>
          
          <div className="grid grid-cols-1 gap-5 p-5"  >
          {list_equipements.map((equipement) => (
              <div key={equipement} className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                <div className="sm:col-span-1 flex items-center">
                  <div className="flex h-6 items-center">
                    <input
                      checked={equipementsNom[equipement] || false}
                      type="checkbox"
                      id={`${equipement}Checkbox`}
                      name={equipement}
                      value={equipement}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>

                  <div className="px-5">
                    <Image src={`/images/icones/${equipement}.png`} alt={equipement} width={30} height={30} />
                  </div>

                  <div className="text-sm leading-6">
                    <label
                      htmlFor={`${equipement}Checkbox`}
                      className="block font-sans text-base font-medium leading-6 text-gray-900 dark:text-gray-200"
                    >
                      {equipement}
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center">
                  <label
                    htmlFor={`${equipement}Description`}
                    className="block font-sans text-base font-medium leading-6 text-gray-900 dark:text-gray-200"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    value={getDescription(equipement)}
                    name={`${equipement}Description`}
                    id={`${equipement}Description`}
                    autoComplete={`${equipement}Description`}
                    onChange={handleDescriptionChange}
                    className="ml-5 block w-full bg-transparent rounded-md border-0 p-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      {/* -------------------------------- */ }    
       

          
        <div className="pt-12">
          <button  type="submit"  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save changes</button>
        </div>
        
    
    </div>
    </form>

    
</div>
  )
  
}
