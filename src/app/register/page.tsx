"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type User = {
  username: string;
  email: string;
  password: string;
};

type Errors = {
  username?: string;
  email?: string;
  password?: string;
};

export default function Register() {
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (user.username.length < 5) {
      newErrors.username = "Username must be at least 5 characters";
    }

    if (user.email.length < 5 || !user.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (user.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/register", user);
        toast
          .promise(
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve("Register successful");
              }, 1000);
            }),
            {
              loading: "Registering...",
              success: "Register successful",
              error: "Register failed",
            }
          )
          .then(() => {
            router.push("/profile");
          });
      } catch (error) {
        toast.error("Login failed");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // const isDisabled =
  //   user.email.length < 5 ||
  //   user.password.length < 8 ||
  //   user.username.length < 5;

  return (
    <div className="w-full h-screen  flex justify-center items-center">
      <div>
        <Toaster />
      </div>
      <div className="w-1/3 h-fit bg-gray-900 rounded-2xl shadow-lg shadow-black pt-5 px-5 py-2">
        <form className="flex justify-center flex-wrap" onSubmit={handleSubmit}>
          <h2 className="text-white text-center font-bold text-3xl p-2">
            {loading ? "processing" : "Register"}
          </h2>
          <input
            type="text"
            className={`w-full bg-gray-800 mt-3 py-1 px-4 rounded-lg focus:outline-none text-white ${
              errors.username ? "border border-red-500" : ""
            }`}
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm w-full mt-1">
              {errors.username}
            </p>
          )}
          <input
            type="email"
            className={`w-full bg-gray-800 mt-3 py-1 px-4 rounded-lg focus:outline-none text-white ${
              errors.email ? "border border-red-500" : ""
            }`}
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm w-full mt-1">{errors.email}</p>
          )}

          <input
            type="password"
            className={`w-full bg-gray-800 mt-3 py-1 px-4 rounded-lg focus:outline-none text-white ${
              errors.password ? "border border-red-500" : ""
            }`}
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm w-full mt-1">
              {errors.password}
            </p>
          )}
          <button
            className={` 
block w-full bg-blue-400 py-1 px-3 m-3 rounded-full font-semibold `}
            type="submit"
          >
            Register
          </button>

          <p className="text-cyan-200 text-sm ">
            <a href="/login">Already have an Account? Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
