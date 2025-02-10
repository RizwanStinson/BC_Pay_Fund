"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   setIsLoading(true);

   try {
     const emailToRouteMap: Record<string, string> = {
       "teamLead@starkCoders.com": "/starkCoders",
       "teamLead@baratheonBuilders.com": "/baratheonBuilders",
       "teamLead@martellMaverics.com": "/martellMaverics",
       "teamLead@targaryenDebuggers.com": "/targaryenDebuggers",
       "teamLead@lannisterLogicLords.com": "/lannisterLogicLords",
       "teamLead@tyrellTechnocratscom": "/tyrellTechnocratscom",
     };


     const redirectPath = emailToRouteMap[formData.email];

     if (redirectPath) {
       router.push(redirectPath);
     } else {
       console.error("No route found for this email.");
     }
   } catch (error) {
     console.error("Login error:", error);
   } finally {
     setIsLoading(false);
   }
 };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-4 sm:p-6">

      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold text-blue-600">
            BC_Pay
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">Log in to your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging In..." : "Log In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
