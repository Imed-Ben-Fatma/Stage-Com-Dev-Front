"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { logoutBtn } from '../components/logoutBtn';
import React from 'react';
import Loading from '../components/pageLoading';
import { AlertSuccess} from "@/app/components/alerts";
import { useSearchParams } from "next/navigation";

export default function ProfilePage() {



  const searchParams = useSearchParams();
  const successMessage = searchParams.get("SuccessMessage");
  
  

  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    const token = Cookies.get('token');
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/users/profile", {
        headers: { 'Authorization': token }
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!userData) {
    return (<div><Loading/></div>)
  }

  return (
    <div className='w-full h-screen dark:bg-gray-950'>
                        {successMessage && <AlertSuccess message={successMessage} />}

      <div className="px-10 pt-10">
        <div className="relative mt-16 mb-32 max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg">
          <div className="rounded overflow-hidden shadow-md">
            <div className="absolute -mt-20 w-full flex justify-center">
              <div className="h-32 w-32">
                <img 
                    src={userData.avatar_url ? `http://localhost:3000/${userData.avatar_url}` : `/images/UserProfile.png`}
                    className="rounded-full object-cover h-full w-full shadow-md" alt="Profile" />
              </div>
            </div>
            <div className="px-6 mt-16">
              <h1 className="font-bold text-3xl text-center mb-1 text-whithe tracking-wider">{userData.name}</h1>
              <p className="test-stone-500 text-base text-center mb-2"><span className='font-semibold tracking-wider text-base ' >{"Email : "}</span>{userData.email}</p>
              <p className="test-stone-500 text-sm text-center mb-5"><span className='font-semibold tracking-wider text-base ' >{"Telephone : "}</span>{userData.telephone}</p>
            </div>

            <div className="mx-5 mb-5 mt-10">
              <a href='/profile/update' className="mt-5 mb-5 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Update
              </a>
              {logoutBtn()}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
