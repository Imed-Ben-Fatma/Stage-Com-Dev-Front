import React, { useState, useEffect } from 'react';

export function AlertSuccess({message}) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      {showAlert && (
        <div className={`text-white m-5 px-6 py-4 border-0 rounded w-4/5 bg-green-500 relative`}>
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
            <span className="capitalize font-bold">Alerte !</span>
            { " "+message}
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      )}
    </div>
  );
}


export function AlertDanger({message}) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      {showAlert && (
        <div className={`text-white m-5 px-6 py-4 border-0 rounded w-4/5 bg-red-500 relative`}>
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
            <span className="capitalize font-bold">Alerte !</span>
            { " "+message}
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      )}
    </div>
  );
}


export function AlertAttention({message}) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      {showAlert && (
        <div className={`text-white m-5 px-6 py-4 border-0 rounded w-4/5 bg-red-500 relative`}>
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
            <span className="capitalize font-bold">Alerte !</span>
            { " "+message}
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      )}
    </div>
  );
}