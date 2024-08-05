export function commentaireCard(userName, userAvatarUrl, commentaire, create, note) {
    const API_BASE_URL = 'http://localhost:3000';
    const date= new Date(create);


    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${monthNames[date.getMonth()]}/${date.getFullYear()}`;


    return (
      <div className="w-96 p-5 bg-gray-100 shadow-lg dark:bg-slate-700 rounded-lg">
        <div className="flex items-center ">
          <div className="h-16 w-16">
            <img
              src={userAvatarUrl ? `${API_BASE_URL}${userAvatarUrl}` : `/images/UserProfile.png`}

              className="rounded-full object-cover h-full w-full shadow-md"
              alt="Profile"
            />
          </div>
          <h3 className="mx-2 font-sans text-xl font-medium">{userName}</h3>
        </div>
  
        <div className="flex justify-between mt-2 mx-1">
          <h4 className="mb-2 text-sm font-bold leading-tight text-neutral-800 dark:text-neutral-50 flex">
            {Array.from({ length: note }, (_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 ml-1 "
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            ))}

            {Array.from({ length: 5-note }, (_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="gray"
                className="w-4 h-4 ml-1 "
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
            
            <span className="ml-2">{formattedDate}</span>
          </h4>
        </div>
        <div className="ml-5" >
          <p>{commentaire}</p>
        </div>
      </div>
    );
  }
  