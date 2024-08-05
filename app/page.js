'use client'

import { useState } from "react";
import dynamic from 'next/dynamic';


import CardPost from "./components/cardPost";

const types = [ 'tous les logements',
  'Appartement', 'Maison', 'Chambre privée', 'Chambre partagée', 'Studio', 'Villa', 'Bungalow',
  'Chalet', 'Cabane', 'Maison de ville', 'Gîte', 'Hôtel', 'Auberge', 'Péniche', 'Tente', 'Tipi',
  'Yourte', 'Roulotte', 'Igloo', 'Refuge', 'Tour', 'Ferme', 'Château', 'Résidence secondaire',
  'Complexe hôtelier', 'Bed and breakfast'
];

export default function Home() {


  const [typeLogement, setTypeLogement] = useState(null);

  const handleButtonClick = (type) => {
    setTypeLogement(type);
    console.log('Selected type:', type);
  };

  return (
    <div className="bg-slate-100 dark:bg-gray-800">
      <ul className="flex flex-row gap-3 m-5 px-2 overflow-y-auto">
        {types.map((type, index) => (
          <li key={index}>
            <button
              type="button"
              className="w-44 py-2 px-3 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => handleButtonClick(type)}
            >
              {type}
            </button>
          </li>
        ))}
      </ul>
      <div  >
        <CardPost typeLogement={typeLogement} />
      </div>
    </div>
  );
}
