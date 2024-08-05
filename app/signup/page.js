
"use client";
import './styles.css'
import { useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation'
import Link from 'next/link';



export default function LoginPage() {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [status, setStatus] = useState(null)


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(password==passwordConfirm)
           { const response = await axios.post('http://localhost:3000/signup', 
                {
                    user: 
                    {
                        email: email,
                        password: password,
                        name: name,
                        telephone: telephone
                    }
                });
                setStatus(response.status)
                setError(null);

                setSuccessMessage("Vérifiez votre email pour confirmer votre compte.")
                
            }else
            setError('verify your password');
        } catch (err) {
            setError('Sign up failed');

        }
    };

    return (
        <section class="min-h-screen flex items-center justify-center w-full py-5 bg-bg-image">

            <Link href={'/signup/owner'} className=' w-[13rem] p-2 shadow-lg text-slate-900 font-semibold text-base text-center bg-gray-200 hover:bg-gray-300 rounded-lg absolute right-6 top-20' >
                Si vous êtes propriétaire <span> inscrivez-vous ici</span>
            </Link>
            <div
                class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 ">
                
                <div class=" space-y-4 md:space-y-6 px-8 py-6">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an
                    account
                </h1>
                <form class="space-y-3" method="POST" onSubmit={handleSubmit} >
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full name</label>
                        <input type="text" name="name" id="name" 
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-indigo-700"
                            placeholder="Imed Ben Fatma" 
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="text" name="email" id="email" 
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-indigo-700"
                            placeholder="imad.benfatma98@gmail.com" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="telephone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telephone</label>
                        <input type="text" name="telephone" id="telephone" 
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-indigo-700"
                            placeholder="99 999 999" 
                            required
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" 
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-indigo-700"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="passwordConfirm" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Confirm</label>
                        <input type="password" name="passwordConfirm" id="password" placeholder="••••••••" 
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-indigo-700"
                            required
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </div>
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Create an account
                    </button>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account? <a
                        class="font-medium text-blue-600 hover:underline dark:text-blue-500" href="/login">Sign in here</a>
                    </p>
                </form>

                {successMessage &&
                    <div className="flex items-center p-4 mb-4 text-sm text-green-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400 mt-3" role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div>
                            <span className="font-medium">{successMessage}</span>
                        </div>
                    </div>
                }

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
        </section>
    );
}
