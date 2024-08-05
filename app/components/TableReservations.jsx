import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { updateReservationStatus } from "@/api/reservation";
import { CardPostForReservation } from "./cardPostForOwner";
import Link from "next/link";
import Status from "./satatus"
import UserCard from "./userCard";

export function ReservationsTable({ post, reservations, onUpdate }) {
  
  const [filter, setFilter] = useState("Tous");
  const [filteredReservations, setFilteredReservations] = useState(reservations);

  useEffect(() => {
    setFilteredReservations(
      filter === "Tous"
        ? reservations
        : reservations.filter(reservation => reservation.statut === filter.toLowerCase())
    );
  }, [filter, reservations]);

  const handleUpdateStatus = async (postId, status) => {
    try {
      await updateReservationStatus(postId, status);
      onUpdate(); // Appeler la fonction de mise à jour après la modification
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  return (
    <div className="p-5 ">
      <div className="border-b">
        <div className="mx-5 mb-5 flex place-content-between items-center ">
          <h2 className="text-5xl font-bold tracking-wider">Réservations</h2>
          <div>
            <Button onClick={() => setFilter("Tous")} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tous</Button>
            <Button onClick={() => setFilter("Accepter")} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Accepter</Button>
            <Button onClick={() => setFilter("Refuser")} className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Refuser</Button>
            <Button onClick={() => setFilter("En cours de traitement")} className="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:focus:ring-orange-900">En cours de traitement</Button>
          </div>
        </div>
      </div>

      <CardPostForReservation
              key={post.id}
              id={post.id}
              images={post.images}
              titre={post.titre}
             // type={post.type_logements.type}
              prix={post.prix}
              adresse={post.adresse}
              moyenneNote={post.moyenneNote}
            />

      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-900 shadow-md">
        <table className="w-full border-collapse bg-white dark:bg-gray-900 text-left text-sm text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-950 border-2 border-gray-950">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-slate-50">User</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-slate-50">Date arrivee</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-slate-50">Date départ</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-slate-50">Nbr des nuits</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-slate-50">Prix</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-slate-50">Status</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900 dark:text-slate-50"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-2 border-gray-100 dark:divide-gray-950 dark:border-gray-950">
            {filteredReservations.map((reservation) => (
              <ReservationRow key={reservation.id} reservation={reservation} onUpdate={onUpdate}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function nbrNuits(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const timeDifference = endDate - startDate;
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference;
}

function ReservationRow({ reservation, onUpdate }) {
  const nights = nbrNuits(reservation.dateArrivee, reservation.dateDepart);

  const handleUpdateStatus = async (reservation_id, status) => {
    try {
      await updateReservationStatus(reservation_id, status);
      onUpdate(); // Appeler la fonction de mise à jour après la modification
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
      <td className=" px-6 py-4">

        <UserCard imageUrl={reservation.user?.avatar_url} name={reservation.user?.name} phoneNumber={'99 999 999'}/>

      </td>
      <td className="px-6 py-4 dark:text-gray-300">{reservation.dateArrivee}</td>
      <td className="px-6 py-4 dark:text-gray-300">{reservation.dateDepart}</td>
      <td className="px-6 py-4 dark:text-gray-300">{nights}</td>
      <td className="px-6 py-4 dark:text-gray-300">{reservation.prixTotal}</td>
      <td className="px-6 py-4 "><Status status={reservation.statut} /></td>
      {reservation.statut === "en cours de traitement" && (
        <td className="py-4 flex space-x-4 pt-5  ">
          <Link href="?DangerMessage=Danger">
            <Image src="/images/icones/close.png" alt="refuser" width={40} height={40} onClick={() => handleUpdateStatus(reservation.id, "refuser")} />
          </Link>

          <Link href="?SuccessMessage=trueSuccess">
            <Image src="/images/icones/accept.png" alt="accept" width={40} height={40} onClick={() => handleUpdateStatus(reservation.id, "accepter")} />
          </Link>
        </td>
      )}
    </tr>
  );
}


