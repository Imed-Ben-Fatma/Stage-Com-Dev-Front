export default function UserCard({imageUrl,name,phoneNumber}){
    return(
        <div className="flex items-center" >
            <div className="relative h-12 w-12">
                <img
                    className="h-full w-full rounded-full object-cover object-center"
                    src={imageUrl ? `http://localhost:3000/${imageUrl}` : `/images/UserProfile.png`}
                    alt={name || "User Name"}
                />
            </div>

            <div className="text-sm ml-2">
                <div className="font-semibold text-base text-gray-700 dark:text-slate-50 tracking-wide  ">{name}</div>
                <div className="text-gray-400 ml-1">{phoneNumber}</div>
            </div>
        </div>
    )
}