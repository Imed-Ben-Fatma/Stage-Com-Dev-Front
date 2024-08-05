'use client'
import Link from "next/link";
import Status from "./satatus";
import UserCard from "./userCard";
import React, { useEffect, useState } from 'react';
import { createCommentaire } from '@/api/commentaires';
import { createNote,getnote } from '@/api/note';
import { useRouter } from "next/navigation";


const baseUrl = 'http://localhost:3000';

//----------------------------------------------------------------------------------------------------------------------------------
export function CardReservationForUser({reservation}) {
    const [test, setTest] = useState(false);
    
    return (
        <div className=" bg-white dark:bg-slate-900 my-3 p-2 w-[72rem] rounded-lg" >
        <Link href={`/post/${reservation.post.id}`}  className=" shadow-lg flex items-center relative">
            <img
                src={ reservation.post.image ? `${baseUrl+reservation.post.image}` : '/images/unnamed.png'}
                alt=""
                className="shadow-md rounded-lg bg-slate-50 w-[17rem]"
                width="1216"
                height="640"
            />
            <div className="ml-5">
                <h3 className="mb-1 text-slate-900 font-semibold dark:text-gray-200">
                    <span className="block text-3xl mb-3 font-bold tracking-wider leading-6">{reservation.post.titre}</span>
                </h3>
                <div className=" flex items-center "  >
                    <div className="mr-5 " >
                        <h3 className="ml-2 mb-1 text-slate-600 dark:text-gray-400 flex items-center">
                            <span className="block text-lg font-semibold tracking-wider leading-6 mr-2">Type:</span>
                            <span className="block text-lg font-semibold tracking-wider leading-6">{reservation.type_logements}</span>
                        </h3>
                        <h3 className="ml-2 mb-1 text-slate-600 font-semibold dark:text-gray-400 flex items-center w-auto ">
                            <span className="block text-lg tracking-wider leading-6 mr-2">Adresse:</span>
                            <span className="block text-lg tracking-wider leading-6">{reservation.post.adresse&&(reservation.post.adresse.ville+', '+reservation.post.adresse.pays)}</span>

                        </h3>
                        <h3 className="ml-2 mb-1 text-slate-600 font-semibold dark:text-gray-400 flex items-center ">
                            <span className="block text-lg tracking-wider leading-6 mr-2">Prix total:</span>
                            <span className="block text-lg tracking-wider leading-6">{reservation.prixTotal&&(reservation.prixTotal+'$')}</span>
                        </h3>

                        <h3 className="ml-2 mb-1 text-slate-600 font-semibold dark:text-gray-400 flex items-center ">
                            <span className="block text-lg tracking-wider leading-6 mr-2">Note:</span>
                            <span className="block text-lg tracking-wider leading-6">{reservation.post.note&&(reservation.post.note)}</span>
                            <div className="pb-1" >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ">
                                    <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clipRule="evenodd"
                                    />
                                 </svg>
                            </div>
                        </h3>
                    </div>


                    <div className=" ml-5 border-x px-8 ">

                        <h3 className="ml-2 mb-1 text-slate-600 dark:text-gray-400 flex items-center ">
                            <span className="block text-lg font-semibold tracking-wider leading-6 mr-2">Date arrivee:</span>
                            <span className="block text-lg font-semibold tracking-wider leading-6">{reservation.dateArrivee}</span>

                        </h3>
                        <h3 className="ml-2 mb-1 text-slate-600 font-semibold dark:text-gray-400 flex items-center ">
                            <span className="block text-lg tracking-wider leading-6 mr-2">Date depart:</span>
                            <span className="block text-lg font-semibold tracking-wider leading-6">{reservation.dateDepart}</span>

                        </h3>

                        <h3 className="ml-2 mb-1 text-slate-600 font-semibold dark:text-gray-400 flex items-center ">
                            <span className="text-lg tracking-wider leading-6 mr-2 ">Status: </span>
                            <Status status={reservation.statut} />
                        </h3>

                    </div>
                    <div className="ml-6" >
                        <h3 className=" mb-3 text-slate-600 font-semibold dark:text-gray-400 flex items-center ">
                            <span className="text-lg tracking-wider leading-6 ">Propriétaire: </span>
                        </h3>
                        <div className="ml-3" >
                            <UserCard imageUrl={reservation.owner.avatar_url} name={reservation.owner.name} phoneNumber={reservation.owner.telephone}/>
                        </div>
                    </div>
                </div>

               

                
            </div>

        </Link>

        <div className="absolute top-3 right-3">
        <button type="button" onClick={() => setTest(!test)} className=" font-semibold text-sm flex items-center justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none rounded-lg p-2">
        {test ? (
               'Annuler'
            ) : 'Laissez un commentaire'}
        </button>
      </div>
        {test ? (
                <div>
                    <CommentaireForm post_id={reservation.post.id} reservation_id={reservation.id} user_id={reservation.user_id}/>
                </div>
            ) : null}
        </div>
    );
}

//----------------------------------------------------------------------------------------------------------------------------------

export function CardPostForReservation({id, images,titre, type, prix,adresse, note}) {

    return (
        <Link href={`/post/${id}`}  className=" shadow-lg flex items-center relative bg-white dark:bg-slate-900 my-3 p-2 rounded-lg">
            <img
                src={images ? `http://localhost:3000${images[0].url}` : '/images/unnamed.png'}
                alt=""
                className="shadow-md rounded-lg bg-slate-50 w-[17rem]"
                width="1216"
                height="640"
            />
            <div className="ml-5">
                <h3 className="mb-1 text-slate-900 font-semibold dark:text-gray-200">
                    <span className="block text-3xl font-bold tracking-wider leading-6 mb-3">{titre}</span>
                </h3>
                <h3 className="ml-2 mb-1 text-slate-600 dark:text-gray-400">
                    <span className="block text-lg font-semibold tracking-wider leading-6">{type}</span>
                </h3>
                <h3 className="ml-2 mb-1 text-slate-600 font-semibold dark:text-gray-400">
                    <span className="block text-lg tracking-wider leading-6">{adresse&&(adresse.ville+', '+adresse.pays)}</span>
                </h3>
                <h3 className="ml-2 mb-1 text-slate-600 font-semibold dark:text-gray-400 flex items-center space-x-1">
                    <span className="block text-lg tracking-wider leading-6">{prix}$</span>
                    <span className="block text-sm font-medium tracking-wider leading-6">Par nuit</span>
                </h3>
                <h3 className="ml-2 mb-1 text-slate-600 font-semibold dark:text-gray-400">
                    <span className="block text-lg tracking-wider leading-6">{note}</span>
                </h3>
            </div>
        </Link>
    );
}

//----------------------------------------------------------------------------------------------------------------------------------

export function CommentaireForm({ post_id, reservation_id, user_id }) {
    const [note, setNote] = useState(null);
    const [commentaire, setCommentaire] = useState('');
    const [testnote, setTestnote] = useState(false);
    const router =useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getnote(reservation_id, user_id);
                if (response.note) {
                    setTestnote(true);
                }
                console.log(testnote);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        fetchData();
    }, [reservation_id, user_id, testnote]);

    const ajouterCommentaire = async () => {
        try {
            console.log('=====> post:' + post_id + '/ reservation:' + reservation_id);
            if(commentaire!=='')
            {await createCommentaire(commentaire, post_id, reservation_id);
            router.push('?SuccessMessage=Votre commentaire a été ajouté avec succès.')
            window.location.reload();
        }

            if(note!==null)
            {await createNote(note, post_id, reservation_id);
            console.log('Note added successfully')
            setNote(null);
        }
        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
    };

    return (
        <div className='m-5'>
            {!testnote && (
                <div className="mb-4">
                    <label htmlFor="note" className="block text-gray-700 dark:text-gray-400 font-medium mb-2">Note</label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        id="note"
                        name='note'
                        type="number"
                        placeholder="5"
                    />
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="comment" className="block text-gray-700 dark:text-gray-400 font-medium mb-2">Commentaire</label>
                <textarea
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    id="comment"
                    name='comment'
                    rows="4"
                    placeholder="Entrez votre commentaire"
                ></textarea>
            </div>
            <div className="relative h-10">
                <button
                    onClick={ajouterCommentaire}
                    className="text-white py-2 px-4 font-semibold tracking-wide rounded-md bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none absolute right-0"
                >
                    Ajouter
                </button>
            </div>
        </div>
    );
}

  //----------------------------------------------------------------------------------------------------------------------------------