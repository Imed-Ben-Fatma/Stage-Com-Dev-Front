'use client'
import { posteImages } from "../../components/posteImages";
import { commentaireCard } from "../../components/commentaireCard";
import { equipement } from "../../components/equipement";
import { description } from "../../components/description";
import { ownerPoste } from "../../components/ownerPoste";
import { posteParames } from '../../components/posteParams';
import { fetchPostDetailes,archiverPost,blockedPost ,deletePost} from "@/api/posts";
import { useEffect,useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Loading from "@/app/components/pageLoading";

import ReservationCard from '@/app/components/reservationCard'

import Map from '@/app/components/map';
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

import { AlertSuccess} from "@/app/components/alerts";
import { useSearchParams,useRouter } from "next/navigation";
const API_BASE_URL = 'http://localhost:3000';


export default function PosteDetailes({ params }) {
  const searchParams = useSearchParams();
  const message = searchParams.get("Message");


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleClose = () => setOpen(false); 

  const [post, setPost] = useState();
  const [status, setStatus] = useState();
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPostDetailes(params.postId);
        setPost(response);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchData();
  }, [params.postId,status]);

  if (!post) {
    return <div><Loading/></div>;
  }

  const renderCommentaires = () => {
    return <div className='grid grid-cols-3 gap-6' >
            {post.commentaires.map((commentaire) => (
              <div>{commentaireCard(commentaire.user_name,commentaire.user_image,commentaire.commentaire,commentaire.create,commentaire.note)}</div>
            ))}
           </div>;
  };

  
  const bloquer = async () => {
   
    try {
      
      const response = await blockedPost(params.postId);
      setStatus(response);
      
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };
  const archiver = async () => {
    try {
      const response = await archiverPost(params.postId);
      setStatus(response);
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  const postDelete = async () => {
   
    try {
      console.log('Deleting post with ID:', params.postId);
      const response = await deletePost(params.postId);
      console.log('Delete response:', response);
      console.log('Post deleted, redirecting...');
      router.push('/owner/monPosts');
      console.log('Redirect called');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };


  return (
    
    <div className="bg-white dark:bg-gray-800">
      {message && <AlertSuccess message={message} />}


      <div className="mx-5  p-4  flex place-content-between items-center">
        <h2 className="text-5xl font-bold tracking-wider">{post.titre}</h2>
        {
          ((Cookies.get("role")==="owner")||(Cookies.get("role")==="admin"))&& (Cookies.get("token"))?
            (<div className=" relative w-1/2 pb-8" >
              <div className="absolute right-0 " >
              {(Cookies.get("role")==="admin") ? (
            
                <button
                onClick={()=>{bloquer()}}
                className="text-white bg-red-800 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2  ">
              {post.blocked ? 'débloquer' : 'bloquer'}
              </button>
              ): null}

              <button 
              onClick={()=>{archiver()}}
              className="text-white bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2  ">
              {post.archived ? 'publier' : 'archiver'}
              </button>
              <Link href={`/post/${post.id}/reservations`} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Réservations</Link>
              <Link href={`/post/${post.id}/update`} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Modifier</Link>
              <button onClick={postDelete} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Supprimer</button>
            </div>
            </div>):(<div></div>)
        }
        
      </div>



        
      <div className="relative border-t mx-5">

        {/* -------------------------------- */ }


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
            <div className=" absolute top-0 right-0 ">
                <button  onClick={handleClose} type="button" className="  w-10 h-10 bg-white rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100">                
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <CardBody >

                <Typography variant="h4" color="blue-gray">
                    Images
                </Typography>
                <div className="overflow-y-auto h-[26rem] px-2">
                <div className="grid grid-cols-2 gap-4">
                    {post.images.map((image) => (
                      <img
                        key={image.id} // Assurez-vous d'ajouter une clé unique pour chaque image
                        src={`${API_BASE_URL}/${image.url}`}
                        alt={`Image ${image.id}`} // Ajoutez un attribut alt pour l'accessibilité
                        className=" w-full mb-2 rounded-lg shadow-lg " // Ajoutez des classes pour styliser l'image
                      />
                    ))}
                    </div>
                </div>
                </CardBody>

                </Card>

      </dialog>
    
{/* -------------------------------- */ }
        <div>
          {posteImages(post.images)}
        </div>
      </div>

      <div className="border-t mx-5 flex justify-between">
        <div>{posteParames( post.nbrChambres, post.nbrLits, post.nbrSalleDeBain, post.moyenneNote, post.comment_count, post.type_logement, post.adresse)}</div>



        {
          ((Cookies.get("role")==="user"))&& (Cookies.get("token"))?
            (<div className='  m-5 '>
              <ReservationCard post_id={post.id} prix={post.prix} />
            </div>):(<div></div>)
        }

        
      </div>

      <div className="border-t py-5 mx-5 mt-5">
        {ownerPoste(post.owner.name)}
      </div>

      <div className="border-t mx-5">
        {description(post.description,post.regles)}
      </div>

        <div className="border-t px-5 mx-5">
          {equipement(post.equipements)}
        </div>
      

      <div className="border-t mx-5 py-5">
      <h3 className=" ml-5 mb-5 font-sans text-xl font-medium" >Commentaires</h3>


        <div className='mx-5' >{renderCommentaires()}</div>

      </div>

      <div className="border-t mx-5 py-5">
        <h3 className=" ml-5 mb-2 font-sans text-xl font-medium" >Map</h3>
        <div className='mx-10' >
          <Map coordonnees={post.adresse.localisationGPS} />
        </div>
      </div>
    </div>
  );
}