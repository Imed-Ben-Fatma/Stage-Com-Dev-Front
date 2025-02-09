
"use client"
import './styles.css'
import { AlertSuccess} from "@/app/components/alerts";
import { useSearchParams } from "next/navigation";

import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'



export default function LoginPage() {
    const searchParams = useSearchParams();
    const successMessage = searchParams.get("SuccessMessage");
  
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                user: {
                    email: email,
                    password: password
                }
            });
            
            const authToken = response.headers['authorization'];
            Cookies.set('token', authToken, { expires: 1});
            Cookies.set('userId', response.data.userId, { expires: 1});
            Cookies.set('role', response.data.role, { expires: 1});
            setError(null);
            if (response.data.role==='owner'){            
                router.push('/owner/monPosts?SuccessMessage=Login successful');
            }else if (response.data.role==='admin') {
                router.push('/admin/allOwners?SuccessMessage=Login successful');
            }else if (response.data.role==='user') {
                router.push('/user/monReservation?SuccessMessage=Login successful');
            }
        } catch (err) {
            setError('Login failed');
            
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full bg-bg-image ">
            
            <div className=" w-1/3 bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back! </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-indigo-700"
                            placeholder="your@email.com"
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-indigo-700"
                            placeholder="Enter your password"
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>
                    <div className=" justify-items-end mb-4">

                        <a href="/signup"
                            className="  font-medium text-sm text-blue-600 hover:underline dark:text-blue-500">
                            Create Account
                        </a>
                    </div>

                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                    </button>
                </form>
                {error &&
                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-3" role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div>
                            <span className="font-medium">{error}</span>
                        </div>
                    </div>
                }
            
            </div>
        </div>
    );
}
