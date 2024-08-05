export function ownerPoste(ownerName){
    return(
        <div className="flex items-center  px-5 " >
            
                <div className="h-16 w-16 ">
                    <img 
                        src= "https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil-300x300.png" 
                        className="rounded-full object-cover h-full w-full shadow-md" alt="Profile" 
                    />
                </div>
                <h3 className="mx-2 font-sans text-lg font-normal">Hôte : {ownerName}</h3> 
            
        </div>
    )
}