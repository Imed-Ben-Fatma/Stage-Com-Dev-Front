'use client'
import { useState, useEffect } from "react";
import { fetchReservationDate } from "@/api/reservation";
import { ReservationsTable } from "@/app/components/TableReservations";
import { fetchPostDetailes } from "@/api/posts";
import { useSearchParams } from "next/navigation";
import { AlertSuccess , AlertDanger } from "@/app/components/alerts";
import { Page403 } from "@/app/components/page403";
import Cookies from 'js-cookie';
import Loading from "@/app/components/pageLoading";


export default function Reservations({ params }) {
  const [reservations, setReservations] = useState([]);
  const [post, setPost] = useState([]);
  const [updated, setUpdated] = useState(false);

  const searchParams = useSearchParams();
  const successMessage = searchParams.get("SuccessMessage");
  const dangerMessage = searchParams.get("DangerMessage");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservations = await fetchReservationDate(params.postId);
        setReservations(reservations);
        const post = await fetchPostDetailes(params.postId)
        setPost(post)
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchData();
  }, [updated]); // Recharger les données quand `updated` change

  const handleUpdate = () => {
    setUpdated(prev => !prev); 
  };


    const [isOwner, setIsOwner] = useState(null);

    useEffect(() => {
      const role = Cookies.get("role");
      setIsOwner((role === "owner")||(role === "admin"));
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
    <div className="bg-slate-100 dark:bg-gray-800">
      {successMessage && <AlertSuccess message={successMessage} />}
      {dangerMessage  && <AlertDanger message={dangerMessage} />}
      <ReservationsTable
        post={post}
        reservations={reservations}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
