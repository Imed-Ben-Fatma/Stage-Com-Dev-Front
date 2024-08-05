"use client"
import React, { useState, useEffect } from 'react';
import { fetchPostsByCurrentUser } from '@/api/posts';
import { CardPostForOwner } from '@/app/components/cardPostForOwner';
import { AlertSuccess} from "@/app/components/alerts";
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Page403 } from "@/app/components/page403";
import CardUserForAdmin from '@/app/components/cardUserForAdmin';
import Loading from '@/app/components/pageLoading';

export default function PosteDetailes() {
  const [posts, setPosts] = useState([]);
  const [role, setRole] = useState([]);
  const [filter, setFilter] = useState(false);

  const searchParams = useSearchParams();
  const successMessage = searchParams.get("SuccessMessage");
  const ownerId = searchParams.get("owner_id");



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPostsByCurrentUser(ownerId,filter);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [filter]);

  const [isOwner, setIsOwner] = useState(null);

  useEffect(() => {
    const role = Cookies.get("role");
    setIsOwner(((role === "owner")||(role === "admin")));
    setRole(role)
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
    <div className='bg-slate-100 dark:bg-gray-800 '>
      
      {successMessage && <AlertSuccess message={successMessage} />}
      
     
      
      <div className=' relative lex items-center justify-center border-b mx-14 '>
        <div className=' mt-8 mb-5 flex items-center place-content-between w-[70rem] ' > 
          
          
          {role === 'owner' ? (
            <div className=' flex items-center place-content-between w-[70rem] ' >
              <h2 className=' font-semibold text-5xl'>Mon postes</h2>
              <Link href={"/owner/addPost"} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                  Ajouter poste
              </Link>
            </div>
          ):(
            <div>
              <CardUserForAdmin user_id={ownerId}/>
              <h2 className=' font-semibold text-5xl mt-5'>Postes</h2>
            </div>
        )}


        </div>
      </div>

      
      <div className='relative flex items-center justify-center'>
      <div className=' absolute right-14 top-4' >
            {filter ? (
                <div>
                <bottom 
                onClick={()=>setFilter(false)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:focus:ring-orange-900" >
                  Tous les postes
                </bottom>
                  </div>
              ):(
                <div>
              <bottom 
              onClick={()=>setFilter(true)}
              className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:focus:ring-orange-900" >
                En cours de traitement
              </bottom>
                </div>
            )}
          </div>
        <div className='mt-12' >
          {posts.map((post) => (

            <CardPostForOwner
              key={post.id}
              id={post.id}
              images={post.images}
              titre={post.titre}
              //type={post.type_logement.type}
              prix={post.prix}
              adresse={post.adresse}
              moyenneNote={post.moyenneNote}
              reservations={post.reservations}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
}
