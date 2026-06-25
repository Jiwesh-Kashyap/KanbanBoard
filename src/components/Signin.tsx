// src/components/Signin.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/signin`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        navigate("/"); // Navigate to dashboard/home on success
      } else {
        const data = await response.json();
        alert(data.message || "Sign in failed");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      alert("Something went wrong while signing in");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="border-2 pt-10 flex flex-col justify-center items-center bg-gray-300 rounded-2xl h-max">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <form
          className="grid p-10 grid-cols-2 grid-rows-4 gap-5 h-max align-middle justify-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            value={email}
            className="bg-white rounded-lg border pl-2"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            className="bg-white rounded-lg border pl-2"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="col-span-2 w-44 justify-self-center cursor-pointer border rounded-2xl bg-pink-300 transition-colors hover:bg-white mt-4">
            Sign In
          </button>

          <span
            className="text-blue-800 col-span-2 justify-self-center cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign up
          </span>
        </form>
      </div>
    </div>
  );
}