'use client'
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

export default function NavBar() {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get('token');
      setAuthToken(token);
    };

    // Initial token check
    checkToken();

    // Set an interval to check the token periodically
    const intervalId = setInterval(checkToken, 1000); // Check every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const logout =()=>{
    Cookies.remove('token')
    Cookies.remove('role')
  }

  return (
    <div>
      <nav className="fixed  z-10 bg-gray-200 dark:bg-slate-900 text-xl font-medium tracking-wider w-full flex justify-between items-center px-5  py-3">
        {/* logo */}
        <div className="inline-flex mx-5  items-center">
          <Link href="/" className="">
            <Image src="/images/logo.svg" alt="Logo" width={40} height={40} />
          </Link>
          <Link href="/" className="ml-1">
          <h2 className=' font-semibold text-2xl' >HomeHunt</h2>
          </Link>
          
          {(Cookies.get('role')==="admin") ? (
            <div className='ml-10 flex items-center space-x-2 '>
              <Link href="/admin/allOwners" className="">
                <h2 className=' border-b-2 px-1.5 font-medium text-xl' >Owners</h2>
              </Link>

              <Link href="/admin/allUsers" className="">
                <h2 className=' border-b-2 px-2 font-medium text-xl' >Users</h2>
              </Link>

            </div>
            ):null}

          {(Cookies.get('role')==="user") ? (
            <div className='ml-10 flex items-center space-x-2 '>
              <Link href="/user/monReservation?" className="">
                <h2 className=' border-b-2 px-1.5 font-medium text-xl' >Réservations
                </h2>
              </Link>
            </div>
          ):null}

        </div>


        <div className="hidden sm:flex flex-grow items-center justify-start px-2 mx-5">
          <div className="flex-grow">
            <div className="inline-block">
              <div className="flex flex-row items-center">


                <div>
                  {(Cookies.get('role')==="owner") ? (<Link
                    href="/owner/monPosts"
                    className="inline-flex items-center text-gray-700 dark:text-white transition-colors duration-150 ease-in-out hover:text-gray-400 focus:outline-none focus:text-gray-400 active:text-gray-400"
                  >
                    <span>Mon Postes</span>
                  </Link>):null}
                </div>
              
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-end">
          <div className="inline-block">
            {authToken ? (
              <div className="inline-flex items-center">
                <div className="text-sm">
                  <Link
                    href="/profile"
                    className="inline-flex items-center text-xl text-gray-700 dark:text-white transition-colors duration-150 ease-in-out hover:text-gray-400 focus:outline-none focus:text-gray-400 active:text-gray-400"
                  >
                    <span>Profile</span>
                  </Link>
                </div>
                <div className="text-sm ml-5">
                  <Link
                    onClick={logout}
                    href="/"
                    className="inline-flex items-center text-xl text-gray-700 dark:text-white transition-colors duration-150 ease-in-out hover:text-gray-400 focus:outline-none focus:text-gray-400 active:text-gray-400"
                  >
                    <span>Log out</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="inline-flex items-center">
                <div className="text-sm">
                  <Link
                    href="/login"
                    className="inline-flex items-center text-lg font-sans text-gray-700 dark:text-white transition-colors duration-150 ease-in-out hover:text-gray-400 focus:outline-none focus:text-gray-400 active:text-gray-400"
                  >
                    <span>Log in</span>
                  </Link>
                </div>
                <div className="text-sm ml-5">
                  <Link
                    href="/signup"
                    className="inline-flex items-center text-lg font-sans text-gray-700 dark:text-white transition-colors duration-150 ease-in-out hover:text-gray-400 focus:outline-none focus:text-gray-400 active:text-gray-400"
                  >
                    <span>Sign up</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
