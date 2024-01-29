"use client"; // to make a component client side to access get input from user.

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttondisable, setButtondisable] = useState(true);

  const onLogin = async () => {
    try {
      setLoading(true);
      const data = {
        username: "a",
        email: "a@gmail.com",
        password: "a",
      };
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success ", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtondisable(false);
    } else {
      setButtondisable(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>Login</h1>
      <label htmlFor="email">email</label>
      <input
        className="p-2 rounded-md text-black"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 rounded-md text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-400 rounded-lg mt-4 focus:outline-none"
      >
        Login here
      </button>

      <Link className="hover:underline " href="/signup">
        Visit Signup page
      </Link>
    </div>
  );
}

export default LoginPage;
