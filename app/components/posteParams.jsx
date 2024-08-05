export function posteParames (nbrChambre,nbrLits,nbrSalleDeBain,note,nbrCommentaires,type_logement,adresse){
    return(
    <div>
        {type_logement?( 
                <h3 className="font-sans text-2xl font-normal pt-5" >{type_logement.typePlace} : {type_logement.type} - {adresse.ville}, {adresse.pays} </h3>
            ):(
                <h3 className="font-sans text-2xl font-normal pt-5" >typePlace invalable : type invalable - {adresse.ville}, {adresse.pays} </h3>
            )}
        <h4 className="font-normal" > {nbrChambre} chambre / {nbrLits} lits / {nbrSalleDeBain} salle de bain</h4>
        <div className="flex justify-between">
            <h4 className=" text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50 flex" > 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1">
                    <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                    />
                </svg>
                {note} . {nbrCommentaires} Commentaires
             </h4>
        </div>   
    </div>
    )
} 