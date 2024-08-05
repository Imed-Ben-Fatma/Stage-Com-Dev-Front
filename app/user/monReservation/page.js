'use client';

import { useState, useEffect } from 'react';
import { CardReservationForUser } from "@/app/components/cardReservationForUser";
import { fetchReservationForUser } from "@/api/reservation";
import Cookies from 'js-cookie';
import { Page403 } from '@/app/components/page403';
import Loading from '@/app/components/pageLoading';
import { AlertSuccess} from "@/app/components/alerts";
import { useSearchParams } from "next/navigation";

export default function MonReservation() {

  const searchParams = useSearchParams();
  const successMessage = searchParams.get("SuccessMessage");
  
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState("Tous");
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [isUser, setIsUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReservationForUser();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservation data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredReservations(
      filter === "Tous"
        ? reservations
        : reservations.filter(reservation => reservation.statut.toLowerCase() === filter.toLowerCase())
    );
  }, [filter, reservations]);

  useEffect(() => {
    const role = Cookies.get("role");
    setIsUser(role === "user");
  }, []);

  if (isUser === null) {
    return <Loading />;
  }

  if (!isUser) {
    return <Page403 />;
  }

  return (
    <div className=''>
            {successMessage && <AlertSuccess message={successMessage} />}

      <div className='flex items-center justify-center border-b mx-14'>
        <div className='mt-8 mb-5 flex items-center place-content-between w-[70rem]'>
          <h2 className='font-semibold text-5xl'>Mes réservations</h2>
          <div>
            <button onClick={() => setFilter("Tous")} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tous</button>
            <button onClick={() => setFilter("Accepter")} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Accepter</button>
            <button onClick={() => setFilter("Refuser")} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Refuser</button>
            <button onClick={() => setFilter("En cours de traitement")} className="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:focus:ring-orange-900">En cours de traitement</button>
          </div>
        </div>
      </div>

      <div className="p-2 flex items-center justify-center">
        <div>
          {filteredReservations.map((reservation) => (
            <div className='relative mx-5' key={reservation.id}>
              <CardReservationForUser reservation={reservation} />
              <div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



