"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation'
import Loading from '@/app/components/pageLoading';
import { useRouter } from 'next/navigation'


export default function UpdateProfile() {

    const [userData, setUserData] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [status, setStatus] = useState(null)
    const router = useRouter()
    useEffect(() => {
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
                setEmail(response.data.email);
                setName(response.data.name);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const update = async (e) => {
        e.preventDefault();
        
        const token = Cookies.get('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        try {
            const response = await axios.patch("http://localhost:3000/users/update", formData, {
                headers: { 
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data'
                }
            });

            router.push('/profile?SuccessMessage=Votre profil a été mis à jour.')
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    if (!userData) {
        return (<div><Loading/></div>); 
    }

    return (
        <div className="w-full h-screen dark:bg-gray-950 px-10 pt-10">

            <div className="relative mt-16 mb-32 max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg ">
                <div className="rounded overflow-hidden shadow-md">
                    <div className="absolute -mt-20 w-full flex justify-center">
                        <div className="h-32 w-32">
                            <img src={userData.avatar || "https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil-300x300.png"} className="rounded-full object-cover h-full w-full shadow-md" alt="Profile" />
                        </div>
                    </div>
                    <form className="space-y-4 md:space-y-6" onSubmit={update}>
                        <div className="px-6 mt-16">
                            <div className="mx-auto max-w-xs">
                                <label htmlFor="example1" className="mb-1 block text-sm font-medium text-gray-400">Upload Picture Profile</label>
                                <input id="example1" 
                                    type="file" 
                                    onChange={(e) => setAvatar(e.target.files[0])} 
                                    className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" 
                                />
                            </div>
                            <div className="mt-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full name</label>
                                <input type="text" name="name" id="name" 
                                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-indigo-700"
                                    placeholder="Imed Ben Fatma" 
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="mt-5 mb-5 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Update
                            </button>
                        </div>
                    </form>
                </div>

                {status==200 && (
                   redirect('/profile')
                )}
            </div>
        </div>
    );
}
