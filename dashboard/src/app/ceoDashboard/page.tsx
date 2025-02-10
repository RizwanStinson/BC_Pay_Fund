"use client";

import { useState, useEffect } from "react";
import { startOfMonth } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

interface TeamPerformance {
  name: string;
  violations: number;
  amount: number;
  membersCount: number;
}

interface RuleBreaker {
  name: string;
  team: string;
  rulesBroken: number;
  amount: number;
}

interface AnalyticsData {
  weeklyRuleBreaks: { name: string; violations: number }[];
  monthlyRuleBreaks: { name: string; violations: number }[];
  topRuleBreakers: RuleBreaker[];
  lowestRuleBreakers: RuleBreaker[];
  teamEfficiencyIndex: TeamPerformance[];
  totalRulesBreak: number;
  totalContribution: number;
}

interface Entry {
  id: number;
  name: string;
  rule_broken: string;
  amount: number;
  date: string;
}

const teams = [
  { name: "Stark Coders", members: 10 },
  { name: "Lannister Logic Lords", members: 11 },
  { name: "Targaryen Debuggers", members: 11 },
  { name: "Baratheon Builders", members: 7 },
  { name: "Tyrell Technocrats", members: 8 },
  { name: "Martell Mavericks", members: 6 },
];

const teamUrls = [
  "https://fund-json.onrender.com/Stark-Coders",
  "https://fund-json.onrender.com/Lannister-Logic-Lords",
  "https://fund-json.onrender.com/Targaryen-Debuggers",
  "https://fund-json.onrender.com/Baratheon-Builders",
  "https://fund-json.onrender.com/Tyrell-Technocrats",
  "https://fund-json.onrender.com/Martell-Mavericks",
];

export default function EnhancedCEODashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    weeklyRuleBreaks: [],
    monthlyRuleBreaks: [],
    topRuleBreakers: [],
    lowestRuleBreakers: [],
    teamEfficiencyIndex: [],
    totalRulesBreak: 0,
    totalContribution: 0,
  });

  const fetchTeamData = async (url: string) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      const now = new Date();
      const monthStart = startOfMonth(now);

      const monthlyData = data.filter(
        (entry: Entry) => new Date(entry.date) >= monthStart
      );

      return {
        url,
        data,
        monthlyData,
      };
    } catch (error) {
      console.error(`Error fetching data for ${url}:`, error);
      return null;
    }
  };

  const computeAnalytics = async () => {
    const teamDataResults = await Promise.all(teamUrls.map(fetchTeamData));
    const processedData = teamDataResults.filter(Boolean);

    const weeklyRuleBreaks = processedData.map((team) => ({
      name: team!.url.split("/").pop()?.replace(/-/g, " ") || "",
      violations: team!.data.length,
    }));

    const monthlyRuleBreaks = processedData.map((team) => ({
      name: team!.url.split("/").pop()?.replace(/-/g, " ") || "",
      violations: team!.monthlyData.length,
    }));

    const processRuleBreakers = (data: (Entry & { team: string })[]) => {
      const ruleBreakersMap = new Map<string, Set<string>>();
      const amountsMap = new Map<string, number>();

      data.forEach((entry) => {
        if (!ruleBreakersMap.has(entry.name)) {
          ruleBreakersMap.set(entry.name, new Set());
          amountsMap.set(entry.name, 0);
        }
        ruleBreakersMap.get(entry.name)!.add(entry.rule_broken);
        amountsMap.set(
          entry.name,
          (amountsMap.get(entry.name) || 0) + entry.amount
        );
      });

      return Array.from(ruleBreakersMap.entries()).map(([name, rules]) => ({
        name,
        team: data.find((entry) => entry.name === name)?.team || "",
        rulesBroken: rules.size,
        amount: amountsMap.get(name) || 0,
      }));
    };

    const allEntries = processedData.flatMap((team) =>
      team!.data.map((entry: Entry) => ({
        ...entry,
        team: team!.url.split("/").pop()?.replace(/-/g, " ") || "",
      }))
    );

    const ruleBreakers = processRuleBreakers(allEntries);

    const topRuleBreakers = ruleBreakers
      .sort((a, b) => b.rulesBroken - a.rulesBroken || b.amount - a.amount)
      .slice(0, 5);

    const lowestRuleBreakers = ruleBreakers
      .sort((a, b) => a.rulesBroken - b.rulesBroken || a.amount - b.amount)
      .slice(0, 5);

    const teamEfficiencyIndex = processedData.map((team) => {
      const teamObj = teams.find(
        (t) => t.name === team!.url.split("/").pop()?.replace(/-/g, " ")
      );
      return {
        name: teamObj?.name || "",
        violations: team!.data.length,
        amount: team!.data.reduce(
          (sum: number, entry: Entry) => sum + entry.amount,
          0
        ),
        membersCount: teamObj?.members || 0,
      };
    });

    const totalRulesBreak = allEntries.length;
    const totalContribution = allEntries.reduce(
      (sum, entry) => sum + entry.amount,
      0
    );

    setAnalyticsData({
      weeklyRuleBreaks,
      monthlyRuleBreaks,
      topRuleBreakers,
      lowestRuleBreakers,
      teamEfficiencyIndex,
      totalRulesBreak,
      totalContribution,
    });

  };
  useEffect(() => {
    computeAnalytics();
  }, [teamUrls]); // Added teamUrls as a dependency

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-4xl font-bold mb-6">
        Enhanced CEO Analytics Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Rules Break This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.totalRulesBreak}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${analyticsData.totalContribution.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teams.reduce((sum, team) => sum + team.members, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Rule Breaks by Team</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.weeklyRuleBreaks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="violations" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Rule Breaks by Team</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.monthlyRuleBreaks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="violations" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Rule Breakers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Rules Broken</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyticsData.topRuleBreakers.map((breaker, index) => (
                  <TableRow key={index}>
                    <TableCell>{breaker.name}</TableCell>
                    <TableCell>{breaker.team}</TableCell>
                    <TableCell>{breaker.rulesBroken}</TableCell>
                    <TableCell>${breaker.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lowest Rule Breakers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Rules Broken</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyticsData.lowestRuleBreakers.map((breaker, index) => (
                  <TableRow key={index}>
                    <TableCell>{breaker.name}</TableCell>
                    <TableCell>{breaker.team}</TableCell>
                    <TableCell>{breaker.rulesBroken}</TableCell>
                    <TableCell>${breaker.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Performance Efficiency Index</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.teamEfficiencyIndex}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="violations"
                  fill="#8884d8"
                  name="Violations"
                />
                <Bar
                  yAxisId="right"
                  dataKey="amount"
                  fill="#82ca9d"
                  name="Total Amount"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

