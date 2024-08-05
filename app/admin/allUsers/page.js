"use client"
import { useState, useEffect } from "react";
import TableAllUsers from "@/app/components/TableAllUsers";
import Cookies from "js-cookie";
import { Page403 } from "@/app/components/page403";
import Loading from "@/app/components/pageLoading";
export default function AllUsers() {
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

  return (
    <div className="p-5">
      <h2 className="font-semibold text-5xl">Les utilisateurs</h2>
      <TableAllUsers />
    </div>
  );
}
