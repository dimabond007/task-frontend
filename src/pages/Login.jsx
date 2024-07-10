import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserContext } from "@/contexts/UserContext";

import api from "../services/api.service";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, login, logout, getUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginUser = { username, password };
    console.log(loginUser);
    try {
      const res = await api.post("/auth/login", loginUser);

      login(res.data.token);
      navigate("/task");
    } catch (error) {
      console.log(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-row gap-4 max-w-96 flex-wrap">
      <h1 className=" text-primary uppercase tracking-tighter font-black text-3xl">
        Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-4 max-w-96 flex-wrap"
      >
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <p className="text-xs">
        Dont have an account?{" "}
        <Link className="underline font-bold" to="/auth/register">
          Register
        </Link>
      </p>
    </div>
  );
}
