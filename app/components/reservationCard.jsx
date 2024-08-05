"use client"
import React, { useState,useEffect } from "react";
import { Button, Dialog, Card, CardBody, Typography } from "@material-tailwind/react";
import {DateReservation} from"./dateReservation"
import {createReservation} from"../../api/reservation"
import { useRouter } from 'next/navigation'



export default function  ReservationCard({post_id,prix}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleClose = () => setOpen(false); 
  const [daysBetween, setDaysBetween] = useState(0);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nbrVoyageurs, setNbrVoyageurs] = useState()
  const router = useRouter()
  const calculateDaysBetween = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Calculate the difference in time
    const timeDifference = endDate - startDate;

    // Convert time difference from milliseconds to days
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference;
  };

  const handleSubmit = async () => {
    try {
      const data = await createReservation(post_id, startDate, endDate, nbrVoyageurs);
      handleClose();
      router.push('?Message=Votre réservation en cours de traitement')
      router.reload();
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    if (name == "nbrVoyageurs") 
      {
        setNbrVoyageurs(value)
      }
  };

  useEffect(() => {
    if (endDate) {
      const days = calculateDaysBetween(startDate, endDate);
      setDaysBetween(days);
    }
    else if (startDate) {
      const days = calculateDaysBetween(startDate, endDate);
      setDaysBetween(days);
    }
  }, [endDate,startDate]);



  return (
    <div>
      <Button type="button" onClick={handleOpen} className="text-lg text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-semibold font-sans rounded-lg p-0 text-center h-12 w-32 ">
        Réserver
      </Button>
      <dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="w-full h-full fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      >
      
        <Card className="mx-auto w-full max-w-[30rem]  top-40 rounded-md">
            <div className=" absolute top-0 right-0 " onClick={handleClose}>
                <button type="button" className="  w-10 h-10 bg-white rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100">                
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <CardBody className="flex flex-col gap-4">

                <Typography variant="h4" color="blue-gray">
                    Réserver
                </Typography>

                
                < DateReservation post_id={post_id} dateStart={setStartDate} dateEnd={setEndDate}/>
                
                <div>
                    <label>Nombre des voyageurs</label>
                        <input type="number"   
                        name="nbrVoyageurs" id="nbrVoyageurs" autoComplete="nbrVoyageurs" 
                        Value={nbrVoyageurs}  onChange={handleInputChange}        
                        className="col-span-1 p-2 border text-gray-900 dark:text-gray-300 border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  w-full"
                    />
                </div>

                {(endDate && startDate) && (
                  <div className="flex justify-between  ">
                    <p>{prix}$ x {daysBetween} nuits</p>
                    <p className="font-bold">Total: {prix*daysBetween}$</p>
                  </div>
                )}

                <button type="button"
                  onClick={handleSubmit}

                 className=" mt-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-semibold font-sans rounded-lg   text-center h-12 w-full  ">
                    Envoi
                </button>
                    
                </CardBody>

                </Card>

      </dialog>
    </div>
  );
}
