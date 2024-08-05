import Image from "next/image";


export function equipementInput() {
    const equipements=['Wi-Fi','Télévision','Chauffage','Climatisation','Eau chaude','Réfrigérateur','Four',
        'Micro-ondes','Cuisinière','Ustensiles de cuisine','Bouilloire','Machine à café','Jacuzzi',
        'Grille-pain','Lave-vaisselle','Shampooing','Sèche-cheveux','Lave-linge','Fer à repasser',
        'Cintres','Draps supplémentaires','Oreillers et couvertures supplémentaires','Cheminée',
        'Détecteur de fumée','Trousse de premiers secours','Extincteur','Livres et magazines',
        'Parking','Chaise haute','Jeux de société','Piscine','Salle de sport']
    return (
        
            <div className="grid grid-cols-1 gap-5" >
                {equipements.map((equipement)=>
                (<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
                    <div className="sm:col-span-1 flex items-center">
                        <div className="flex h-6 items-center">
                            <input id={`${equipement}Checkbox`} name={`${equipement}Checkbox`} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                        </div>

                        <div className="px-5">
                            <Image src={`/images/icones/${equipement}.png`} alt={equipement} width={30} height={30} />
                        </div>

                        <div className="text-sm leading-6">
                            <label htmlFor="comments" className=" block font-sans text-base font-medium leading-6 text-gray-900 dark:text-gray-200">
                                {equipement}
                            </label>
                        </div>
                    </div>
                    <div className="sm:col-span-2 flex items-center">
                        <label htmlFor="comments" className="block font-sans text-base font-medium leading-6 text-gray-900 dark:text-gray-200">
                            Description
                        </label>
                        <input type="text" name={`${equipement}Description`} id={`${equipement}Description`} autoComplete={`${equipement}Description`} className=" ml-5 block w-full bg-transparent rounded-md border-0 p-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6" />
                    </div>
                </div>))}
          </div>
          
    );
  }
  