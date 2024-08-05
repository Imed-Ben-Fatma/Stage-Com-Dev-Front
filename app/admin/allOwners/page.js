'use client'
import TableAllOwner from "@/app/components/TableAllOwner";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Page403 } from "@/app/components/page403";
import Loading from "@/app/components/pageLoading";
import { useSearchParams } from "next/navigation";
import { AlertSuccess} from "@/app/components/alerts";

export default function allOwners() {
  const searchParams = useSearchParams();
  const successMessage = searchParams.get("SuccessMessage");
  

  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const role = Cookies.get("role");
    setIsAdmin(role === "admin");
  }, []);

  if (isAdmin === null) {
    return <div><Loading/></div>;
  }

  if (!isAdmin) {
    return (
      <div>
        <Page403 />
      </div>
    );
  }

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
            {successMessage && <AlertSuccess message={successMessage} />}

        <h2 className=' font-semibold text-5xl'>Les propriétaires</h2>
      <TableAllOwner/>
    </div>
  );
}

