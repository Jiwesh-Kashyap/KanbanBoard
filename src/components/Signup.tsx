import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== newPassword) {
      setPassword("");
      setNewPassword("");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/signup`,
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
        navigate("/");
      } else {
        const data = await response.json();
        alert(data.message || "Sign up failed");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Something went wrong while signing up");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="border-2 pt-10 flex flex-col justify-center items-center bg-gray-300 rounded-2xl h-max">
        <h1 className="text-2xl font-bold">Sign up</h1>
        <form
          action="POST"
          className="grid p-10 grid-cols-2 grid-rows-6 gap-5 h-max align-middle justify-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            className="bg-white rounded-lg border pl-2"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            className="bg-white rounded-lg border pl-2"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            className="bg-white rounded-lg border pl-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="newPassword">New Password: </label>
          <input
            type="password"
            name="newPassword"
            className="bg-white rounded-lg border pl-2"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="col-span-2 w-44 justify-self-center cursor-pointer border rounded-2xl 
          bg-pink-300 transition-colors hover:bg-white mt-4"
          >
            Sign up
          </button>
          <span
            className="text-blue-800 col-span-2 justify-self-center cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Already have an account?
          </span>
        </form>
      </div>
    </div>
  );
}
