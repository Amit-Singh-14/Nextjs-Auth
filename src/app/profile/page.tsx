"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  async function Logout() {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-4 rounded bg-green-600">
        {" "}
        {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <br />

      <button
        className="bg-purple-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        getUserDetails
      </button>
      <button
        className="bg-blue-600 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={Logout}
      >
        Logout
      </button>
    </div>
  );
}
