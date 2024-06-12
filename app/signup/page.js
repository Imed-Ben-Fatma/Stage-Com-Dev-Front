
"use client";

import { useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation'



export default function LoginPage() {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
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
                        name: name
                    }
                });
                setStatus(response.status)
                setError(null);
            }
            setError('verify your password');
        } catch (err) {
            setError('Sign up failed');

        }
    };

    return (
        <section class="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
            <div
                class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 ">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an
                    account
                </h1>
                <form class="space-y-4 md:space-y-6" method="POST" onSubmit={handleSubmit} >
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
                        <input type="text" name="email" id="username" 
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-indigo-700"
                            placeholder="imad.benfatma98@gmail.com" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                {status==200 && (
                   redirect('/')
                )}
                </div>
            </div>
        </section>
    );
}
