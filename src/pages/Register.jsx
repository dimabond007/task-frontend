import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "../services/api.service";

import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (password !== confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }

    const regUser = {
      firstname,
      lastname,
      username,
      email,
      password,
    };

    const token = await api.post("/auth/register", regUser);

    // console.log("First Name:", firstname);
    // console.log("Last Name:", lastname);
    // console.log("Email:", email);
    // console.log("Password:", password);
  };

  return (
    <div className="flex flex-row gap-4 max-w-96 flex-wrap">
      <h1 className=" text-primary uppercase tracking-tighter font-black text-3xl">
        Register
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-4 max-w-96 flex-wrap"
      >
        {/* <Label htmlFor="email">Email</Label> */}
        <Input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <Label htmlFor="firstname">First Name</Label> */}
        <Input
          type="text"
          id="firstname"
          placeholder="First Name"
          className="flex-1"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        {/* <Label htmlFor="lastname">Last Name</Label> */}
        <Input
          type="text"
          id="lastname"
          placeholder="Last Name"
          className="flex-1"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        {/* <Label htmlFor="username">Username</Label> */}
        <Input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <Label htmlFor="password">Password</Label> */}
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <Input type="email" placeholder="Email" /> */}
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
      <p className="text-xs">
        Already have an account?{" "}
        <Link className="underline font-bold" to="/auth/login">
          Login
        </Link>
      </p>
    </div>
  );
}
