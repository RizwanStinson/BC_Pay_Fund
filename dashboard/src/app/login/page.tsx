"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "react-hot-toast";

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://fund-json.onrender.com/Stark-Coders"
        );
        console.log(response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // backend is hosted on render
    //on render, web services on a free tier go to sleep after some inactivity time
    //so to reduce loading time, fetchData is called here

    useEffect(() => {
      fetchData();
    }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailClick = (email: string) => {
    setFormData({ ...formData, email });
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
        "teamLead@tyrellTechnocrats.com": "/tyrellTechnocrats",
        "hr@kaz.com": "/hrDashboard",
        "ceo@kaz.com": "/ceoDashboard",
      };

      const redirectPath = emailToRouteMap[formData.email];

      if (redirectPath) {
        toast.success("Login successful! Redirecting...", {
          position: "top-right",
          duration: 3000
        });
        setTimeout(() => {
          router.push(redirectPath);
        }, 2000);
      } else {
        toast.error("Invalid credentials. Please try again.", {
          position: "top-right",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-4 sm:p-6">
      <Toaster />
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

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Log In"}
            </Button>
          </form>

          <Button
            onClick={() => setShowCredentials(!showCredentials)}
            className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-black"
          >
            {showCredentials
              ? "Hide Login Credentials"
              : "Show Login Credentials"}
          </Button>

          {showCredentials && (
            <div className="mt-6 text-sm text-gray-700">
              <p className="font-bold">Login Credentials for Team Leads</p>
              {[
                "teamLead@starkCoders.com",
                "teamLead@baratheonBuilders.com",
                "teamLead@martellMaverics.com",
                "teamLead@targaryenDebuggers.com",
                "teamLead@lannisterLogicLords.com",
                "teamLead@tyrellTechnocrats.com",
              ].map((email) => (
                <p
                  key={email}
                  className="cursor-pointer text-blue-500 hover:underline"
                  onClick={() => handleEmailClick(email)}
                >
                  {email}
                </p>
              ))}

              <p className="font-bold mt-4">Login Credentials for HR & CEO</p>
              <p
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => handleEmailClick("hr@kaz.com")}
              >
                HR: hr@kaz.com
              </p>
              <p
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => handleEmailClick("ceo@kaz.com")}
              >
                CEO: ceo@kaz.com
              </p>

              <p className="mt-2 text-gray-500">
                Use password <strong>123</strong> for all logins.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;