import Link from "next/link";
const baseUrl = 'http://localhost:3000';


export function CardPostForOwner({id, images,titre, type, prix,adresse, note, reservations }) {


    let statu = false;
    reservations.forEach((reservation) => {
        if (reservation.statut === 'en cours de traitement') {
            statu = true;
        }
    });

    return (
        <Link href={`/post/${id}`}  className=" shadow-lg flex items-center relative bg-white dark:bg-slate-900 my-3 p-2 w-[60rem] rounded-lg">
            <img
                src={images[0] ? `http://localhost:3000${images[0].url}` : '/images/unnamed.png'}
                alt=""
                className="shadow-md rounded-lg bg-slate-50 w-[17rem]"
                width="1216"
                height="640"
            />
            <div className="ml-5">
                <h3 className="mb-1 text-slate-900 font-semibold dark:text-gray-200">
                    <span className="block text-3xl mb-3 font-bold tracking-wider leading-6">{titre}</span>
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
            
            {
                statu  && (
                    
                <div className="absolute top-3 right-3">
                    
                    <svg height="35" width="35" xmlns="http://www.w3.org/2000/svg">
                        <circle r="12" cx="18" cy="18" fill="red" />
                    </svg>
                </div>
                )
            }
        </Link>
    );
}



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
