'use client';
import Status from "./satatus";
import { getUser } from "@/api/user";
import { useState, useEffect } from "react";
import Loading from "./componentsLoading";

export default function CardUserForAdmin({ user_id }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await getUser(user_id);
                setUser(user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchData();
    }, [user_id]);

    if (!user) {
        return <div><Loading/></div>;
    }

    return (
        <div className="flex items-center m-2 p-3 w-[32rem] shadow-lg rounded-lg bg-slate-200 dark:bg-slate-900">
            <img
                className="h-32 w-32 rounded-full object-cover object-center"
                src={user.avatar_url ? `http://localhost:3000/${user.avatar_url}` : `/images/UserProfile.png`}
                alt={user.name || "User Name"}
            />

            <div className="flex items-center w-full relative">
                <div className="text-sm ml-2">
                    <div className=" space-x-4 flex items-end font-semibold text-3xl text-gray-700 dark:text-slate-50 tracking-wide">
                        <span>{user.name}</span> 
                        <div className="h-11">
                            <Status status={user.status}/>
                        </div>

                    </div>
                    <div className="text-gray-400 ml-2 text-xl">
                        <span>{user.email}</span>
                    </div>
                    <div className="text-gray-400 ml-2 text-xl">
                        <span>{user.telephone}</span>
                    </div>
                    <div className="text-gray-400 ml-2 text-xl">
                        <span>{user.role}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
