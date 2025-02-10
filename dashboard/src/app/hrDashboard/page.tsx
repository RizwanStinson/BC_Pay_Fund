"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, AlertTriangle, DollarSign } from "lucide-react";
import axios from "axios";

interface TeamData {
  name: string;
  totalAmount: number;
  totalRuleBreaks: number;
  mostBrokenRule: string;
  topRuleBreaker: string;
}

interface ApiEntry {
  amount: number;
  rule_broken: string;
  name: string;
}

export default function HRDashboard() {
  const [teamData, setTeamData] = useState<TeamData[]>([]);

  // Moved teamUrls inside the component to make it available in the dependency array
  const teamUrls = [
    "https://fund-json.onrender.com/Stark-Coders",
    "https://fund-json.onrender.com/Lannister-Logic-Lords",
    "https://fund-json.onrender.com/Targaryen-Debuggers",
    "https://fund-json.onrender.com/Baratheon-Builders",
    "https://fund-json.onrender.com/Tyrell-Technocrats",
    "https://fund-json.onrender.com/Martell-Mavericks",
  ];

  const fetchTeamData = async (url: string): Promise<TeamData> => {
    try {
      const response = await axios.get<ApiEntry[]>(url);
      const data = response.data;

      const ruleFrequency: { [key: string]: number } = {};
      const memberRuleBreaks: { [key: string]: number } = {};
      let totalAmount = 0;

      data.forEach((entry: ApiEntry) => {
        totalAmount += entry.amount;
        ruleFrequency[entry.rule_broken] =
          (ruleFrequency[entry.rule_broken] || 0) + 1;
        memberRuleBreaks[entry.name] = (memberRuleBreaks[entry.name] || 0) + 1;
      });

      const mostBrokenRule = Object.keys(ruleFrequency).reduce((a, b) =>
        ruleFrequency[a] > ruleFrequency[b] ? a : b
      );

      const topRuleBreaker = Object.keys(memberRuleBreaks).reduce((a, b) =>
        memberRuleBreaks[a] > memberRuleBreaks[b] ? a : b
      );

      return {
        name: url.split("/").pop()?.replace(/-/g, " ") || "",
        totalAmount,
        totalRuleBreaks: data.length,
        mostBrokenRule,
        topRuleBreaker,
      };
    } catch (error) {
      console.error(`Error fetching data for ${url}:`, error);
      return {
        name: url.split("/").pop()?.replace(/-/g, " ") || "",
        totalAmount: 0,
        totalRuleBreaks: 0,
        mostBrokenRule: "N/A",
        topRuleBreaker: "N/A",
      };
    }
  };

  useEffect(() => {
    const fetchAllTeamData = async () => {
      const results = await Promise.all(teamUrls.map(fetchTeamData));
      setTeamData(results);
    };

    fetchAllTeamData();
  }, [teamUrls]); // Added teamUrls to the dependency array

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">HR Team Performance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teamData.map((team, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-col items-center">
              <CardTitle className="text-xl font-bold">{team.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span>Total Amount</span>
                </div>
                <span className="font-semibold">${team.totalAmount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>Total Rule Breaks</span>
                </div>
                <span className="font-semibold">{team.totalRuleBreaks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Most Broken Rule</span>
                </div>
                <span className="font-semibold">{team.mostBrokenRule}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Top Rule Breaker</span>
                </div>
                <span className="font-semibold">{team.topRuleBreaker}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
