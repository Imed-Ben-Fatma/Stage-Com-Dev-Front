export function equipement(equipements) {
    return (
        <div >
            <h3 className=" mt-5 font-sans text-xl font-medium" >Ce que propose ce logement</h3>
            

            <div class=" grid grid-cols-2 gap-4 content-start w-2/3 p-4"> 
                {(equipements).map((equipement) => (
                    <div className="pl-3 w-80  p-1.5 bg-gray-100 shadow-md dark:bg-slate-700 rounded-lg ">
                        <div className=" flex "  >
                            <img src={`/images/icones/${equipement.nom}.png`} alt={equipement.nom} className="w-7 h-7" />
                        
                            <h4 className=" font-sans text-lg font-normal ml-2" >{equipement.nom}</h4>
                        </div>
                        <p className="px-5 font-normal " >{equipement.description}</p>
                    </div>
                ))}
            </div>
        
        </div>
    );
  }
  