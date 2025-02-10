"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd validate credentials against your backend
    // For this example, we'll use a simple check
    if (email.includes("stark")) {
      dispatch(login("Stark-Coders"));
      router.push("/dashboard");
    } else if (email.includes("lannister")) {
      dispatch(login("Lannister-Logic-Lords"));
      router.push("/dashboard");
    } else if (email.includes("targaryen")) {
      dispatch(login("Targaryen-Debuggers"));
      router.push("/dashboard");
    } else if (email.includes("baratheon")) {
      dispatch(login("Baratheon-Builders"));
      router.push("/dashboard");
    } else if (email.includes("tyrell")) {
      dispatch(login("Tyrell-Technocrats"));
      router.push("/dashboard");
    } else if (email.includes("martell")) {
      dispatch(login("Martell-Mavericks"));
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Card className="w-[350px] mx-auto mt-20">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
