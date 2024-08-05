'use client'

import { useState, useEffect } from "react"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchReservationDate } from "../../api/reservation";
import Loading from "./componentsLoading";

const convertDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};



export function DateReservation ({post_id,dateStart,dateEnd})  {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [excludedDates, setExcludedDates] = useState(null);



  useEffect(() => {
    const fetchDates = async () => {
      const reservations = await fetchReservationDate(post_id);
      const dates = [];
      reservations.forEach(reservation => {
        reservation.dates_between.forEach(date => {
          dates.push(new Date(date));
        });
      });
      setExcludedDates(dates);
    };
    fetchDates();
  }, []);


  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date) {
      console.log("Selected start date: ", convertDate(date));
      dateStart(convertDate(date))
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (date) {
      console.log("Selected end date: ", convertDate(date));
      dateEnd(convertDate(date))
    }
  };

  if (!excludedDates)
    {return(<div><Loading/></div>)}

  return (
    <div className=" grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div>
        <label className="mx-1">Arrivee</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          excludeDates={excludedDates}
          className="col-span-1 p-2 border text-gray-900 dark:text-gray-300 border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600  w-full"
        />
      </div>
      <div>
        <label className="mx-1" >Depart</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          excludeDates={excludedDates}
          className="col-span-1 p-2 border text-gray-900 dark:text-gray-300 border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full"
        />
      </div>
    </div>
  );
};


