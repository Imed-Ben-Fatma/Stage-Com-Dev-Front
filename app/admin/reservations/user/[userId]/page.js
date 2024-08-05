'use client'
import { useState, useEffect } from 'react';
import CardUserForAdmin from "@/app/components/cardUserForAdmin"
import { CardReservationForUser } from "@/app/components/cardReservationForUser"
import { fetchReservationByUser } from '@/api/reservation';
import Cookies from 'js-cookie';
import { Page403 } from '@/app/components/page403';
import Loading from '@/app/components/pageLoading';

export default function ReservationOfUser({ params }) {
    const [isAdmin, setIsAdmin] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [filter, setFilter] = useState("Tous");
    const [filteredReservations, setFilteredReservations] = useState([]);

    useEffect(() => {
        const role = Cookies.get("role");
        setIsAdmin(role === "admin");
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchReservationByUser(params.userId);
                setReservations(data);
            } catch (error) {
                console.error('Error fetching reservation data:', error);
            }
        };
        
        fetchData();
    }, [params.userId]);

    useEffect(() => {
        setFilteredReservations(
            filter === "Tous"
                ? reservations
                : reservations.filter(reservation => reservation.statut.toLowerCase() === filter.toLowerCase())
        );
    }, [filter, reservations]);

    if (isAdmin === null) {
        return <div><Loading /></div>;
    }

    if (!isAdmin) {
        return (
            <div>
                <Page403 />
            </div>
        );
    }

    return(
        <div>
            <div className='mt-10 ml-8 ' >
                <CardUserForAdmin user_id={params.userId}/>
            </div>

            <div >
                <div className='flex items-center justify-center border-b mx-14 '>
                    <div className=' mt-5 mb-5 flex items-center place-content-between w-[70rem] ' > 
                    
                        <h2 className=' font-semibold text-5xl'>Réservations</h2>

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
                    {filteredReservations.map((reservation)=>(
                        
                        <CardReservationForUser reservation={reservation}/>
                        
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}