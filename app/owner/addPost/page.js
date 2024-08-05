'use client'
import Image from "next/image";
import Cookies from "js-cookie";
import { Page403 } from "@/app/components/page403";

import { useState ,useEffect} from "react";
import {addPost}from "@/api/posts"
import Loading from "@/app/components/pageLoading";
import { useRouter } from "next/navigation";
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

export default function AddPost() {


  // State variables for form data
  const [titre, setTitre] = useState();
  const [prix, setPrix] = useState();
  const [description, setDescription] = useState();
  const [images, setImages] = useState([]);

  const [nbrChambres, setNbrChambres] = useState(0);
  const [nbrLits, setNbrLits] = useState(0);
  const [nbrSallesDeBains, setNbrSallesDeBains] = useState(0);

  const [logementType, setLogementType] = useState('Appartement');
  const [typeEspace, setTypeEspace] = useState('Logement entier');
  const [regles, setRegles] = useState();

  const [rue, setRue] = useState();
  const [ville, setVille] = useState();
  const [pays, setPays] = useState();
  const [localisationGPS, setLocalisationGPS] = useState();

  

  const [imagePreviews, setImagePreviews] = useState([]);
  const routre= useRouter()

  
  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);


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
        console.log('***>'+logementType)
        break;
      case 'typeEspace':
        setTypeEspace(value);
      console.log('***>'+typeEspace)
        break;
      case 'regles':
        setRegles(value);
        break;
      case 'rue':
        setRue(value);
        break;
      case 'ville':
        setVille(value);
        break;
      case 'pays':
        setPays(value);
        break;
      case 'gps':
        setLocalisationGPS(value);
        break;
      default:
        break;
    }
  };
  const [equipements, setEquipements] = useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const equipementName = name.replace('Checkbox', '');
    setEquipements((prevEquipements) => {
      const newEquipements = { ...prevEquipements };
      if (checked) {
        newEquipements[equipementName] = '';
      } else {
        delete newEquipements[equipementName];
      }
      return newEquipements;
    });
  };

  const handleDescriptionChange = (event) => {
    const { name, value } = event.target;
    const equipementName = name.replace('Description', '');
    setEquipements((prevEquipements) => {
      if (prevEquipements.hasOwnProperty(equipementName)) {
        return {
          ...prevEquipements,
          [equipementName]: value,
        };
      } else {
        // If the checkbox is not checked, do not update the description
        return prevEquipements;
      }
    });
  };

  var handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reponse= await addPost(
        titre, prix, description, nbrChambres, nbrLits, nbrSallesDeBains,
        regles, logementType, typeEspace, rue, ville, pays, localisationGPS, images, equipements
      );
      
      routre.push(`/owner/monPosts?SuccessMessage=Votre poste a été ajouté.`)

      console.log('Post added successfully');
    } catch (error) {
      console.error('Error adding post:', error.message);
    }
  };
 

  const [isOwner, setIsOwner] = useState(null);

  useEffect(() => {
    const role = Cookies.get("role");
    setIsOwner(role === "owner");
  }, []);

  if (isOwner === null) {
    return <div><Loading/></div>;
  }

  if (!isOwner) {
    return (
      <div>
        <Page403 />
      </div>
    );
  }
   

  return (
    <div className="bg-white dark:bg-gray-800 p-5" >
    <form onSubmit={ handleSubmit} >
      <div>
        
        <h2 className=" my-5 text-4xl font-semibold font-sans leading-7 text-gray-900 dark:text-gray-200">
          Ajouter post
        </h2>
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
                  required
                  Value={titre}   onChange={handleInputChange}
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
                  required onChange={handleInputChange}
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
                    required onChange={handleInputChange}
                    className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 focus:ring-0 text-base sm:leading-6" placeholder="0" />
                  </div>
              </div>

              <div className="col-span-2">
                <label htmlFor="about" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Nombre des lits
                </label>
                  <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="number" name="nbrLits" id="nbrLits" autoComplete="nbrLits" 
                    required onChange={handleInputChange}
                    className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 dark:text-gray-300 placeholder:text-gray-400 focus:ring-0 text-base sm:leading-6" placeholder="0" />
                  </div>
              </div>


              <div className="col-span-2">
                <label htmlFor="about" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Nombre de salles de bains
                </label>
                  <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="number" name="nbrSallesDeBains" id="nbrSallesDeBains" autoComplete="nbrSallesDeBains" 
                    required onChange={handleInputChange}
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
                      on
                      onChange={handleInputChange}
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
                  className="block w-full bg-transparent rounded-md border-0 p-2 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* --------------Localisation------------------ */ }

        <div className="border-t border-gray-400 p-5">
          <h2 className="block font-sans text-3xl font-semibold leading-6 text-gray-900 dark:text-gray-200">
            Localisation 
          </h2>
          <div className="p-5" >

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="rue" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Rue
                  </label>
                <div className="mt-2">
                  <input type="text" name="rue" id="rue" autoComplete="rue" 
                  onChange={handleInputChange}
                  className="block w-full bg-transparent rounded-md border-0 p-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="ville" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Ville
                  </label>
                <div className="mt-2">
                  <input type="text" name="ville" id="ville" autoComplete="ville" 
                  required onChange={handleInputChange}
                  className="block w-full bg-transparent rounded-md border-0 p-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="pays" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Pays
                </label>
                <div className="mt-2">
                  <input type="text" name="pays" id="pays" autoComplete="pays" 
                  required onChange={handleInputChange}
                  className="block w-full bg-transparent rounded-md border-0 p-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="gps" className="block font-sans text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                  GPS
                </label>
                <div className="mt-2">
                  <input type="text" name="gps" id="gps" autoComplete="gps" 
                  required onChange={handleInputChange}
                  className="block w-full bg-transparent rounded-md border-0 p-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6" />
                </div>
              </div>
            </div>
          </div>
        </div>


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
       


        <div className="mr-12 mb-10 grid  justify-items-end ">
          <button  type="submit"  className="  w-28 inline-flex justify-center rounded-lg border border-transparent bg-indigo-600 py-2 px-4 text-base font-semibold tracking-wide  text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Ajouter
          </button>
        </div>
        
    
    </div>
    </form>

    
</div>
  )
  
}

