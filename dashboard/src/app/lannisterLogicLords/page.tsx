"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { AlertTriangle, DollarSign, Users } from "lucide-react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IViolation,
  IFormattedViolation,
  ITeamComparison,
} from "@/interfaces/Interface";

const teams = [
  { name: "Stark Coders", members: 10 },
  { name: "Lannister Logic Lords", members: 11 },
  { name: "Targaryen Debuggers", members: 11 },
  { name: "Baratheon Builders", members: 7 },
  { name: "Tyrell Technocrats", members: 8 },
  { name: "Martell Mavericks", members: 6 },
];

const rules = [
  { id: 1, description: "Fashionably late to meetings", amount: 200 },
  { id: 2, description: "Shoes outside the rack", amount: 50 },
  { id: 3, description: "Empty water bottle in fridge", amount: 50 },
  { id: 4, description: "Abandoned coffee mug", amount: 30 },
  { id: 5, description: "Late return of borrowed items", amount: 100 },
  { id: 6, description: "Phone ringing during meetings", amount: 50 },
  { id: 7, description: "Lights/fans on in empty room", amount: 50 },
  { id: 8, description: "Dodging snack buying turn", amount: 200 },
  { id: 9, description: "Messy workspace", amount: 75 },
  { id: 10, description: "Forgetting to lock door", amount: 150 },
  { id: 11, description: "Speaking loudly on phone", amount: 50 },
  { id: 12, description: "Ignoring group messages", amount: 30 },
  { id: 13, description: "Borrowing without permission", amount: 100 },
  { id: 14, description: "Eating others snacks", amount: 50 },
  { id: 15, description: "Strong-smelling food", amount: 50 },
  { id: 16, description: "Not replacing tissue/toilet paper", amount: 100 },
  { id: 17, description: "Unmuted on video call", amount: 50 },
];

export default function Dashboard() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [selectedRule, setSelectedRule] = useState<{
    description: string;
    amount: number;
  } | null>(null);
  const [amountTotal, setAmountTotal] = useState<number>(0);
  const [totalRuleBreaks, setTotalRuleBreaks] = useState<number>(0);
  const [records, setRecords] = useState<IViolation[]>([]);
  const [violations, setViolations] = useState<IFormattedViolation[]>([]);
  const [teamComparison, setTeamComparison] = useState<ITeamComparison[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const teamUrls = [
    "https://fund-json.onrender.com/Stark-Coders",
    "https://fund-json.onrender.com/Lannister-Logic-Lords",
    "https://fund-json.onrender.com/Targaryen-Debuggers",
    "https://fund-json.onrender.com/Baratheon-Builders",
    "https://fund-json.onrender.com/Tyrell-Technocrats",
    "https://fund-json.onrender.com/Martell-Mavericks",
  ];

  const fetchTeamData = async (url: string): Promise<ITeamComparison> => {
    try {
      const response = await axios.get(url);
      const data = response.data;

      let violations = 0;
      let totalAmount = 0;

      data.forEach((entry: IViolation) => {
        violations += 1;
        totalAmount += entry.amount;
      });

      const teamName = url.split("/").pop()?.replace(/-/g, " ") || "";

      return { name: teamName, violations, amount: totalAmount };
    } catch (error) {
      console.error(`Error fetching data for ${url}:`, error);
      return {
        name: url.split("/").pop()?.replace(/-/g, " ") || "",
        violations: 0,
        amount: 0,
      };
    }
  };

  //change here

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://fund-json.onrender.com/Lannister-Logic-Lords"
      );

      const data = response.data;

      const groupedData: {
        [key: string]: { rulesBroken: number; amount: number };
      } = {};

      data.forEach(({ name, amount }: { name: string; amount: number }) => {
        if (!groupedData[name]) {
          groupedData[name] = { rulesBroken: 0, amount: 0 };
        }
        groupedData[name].rulesBroken += 1;
        groupedData[name].amount += amount;
      });

      //change here

    const initialMembers = [
      "Ethan",
      "Ava",
      "James",
      "Isabella",
      "Benjamin",
      "Mia",
      "Alexander",
      "Charlotte",
      "Daniel",
      "Amelia",
      "Matthew",
    ];


      const formattedData = initialMembers.map((member) => ({
        member,
        rulesBroken: groupedData[member]?.rulesBroken || 0,
        amount: groupedData[member]?.amount || 0,
      }));

      setViolations(formattedData);

      const sortedRecords = response.data
        .sort(
          (a: IViolation, b: IViolation) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .slice(0, 6);

      setRecords(sortedRecords);

      if (Array.isArray(response.data)) {
        let totalAmount = 0;
        let ruleFrequency: { [key: string]: number } = {};
        let totalRuleBreaks = 0;

        response.data.forEach(({ amount, rule_broken }: IViolation) => {
          totalAmount += Number(amount);
          ruleFrequency[rule_broken] = (ruleFrequency[rule_broken] || 0) + 1;
        });

        totalRuleBreaks = Object.values(ruleFrequency).reduce(
          (acc, curr) => acc + curr,
          0
        );

        setAmountTotal(totalAmount);
        setTotalRuleBreaks(totalRuleBreaks);
      }

      const teamComparisonData = await Promise.all(teamUrls.map(fetchTeamData));
      setTeamComparison(teamComparisonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const violationsPerMember = useMemo(
    () =>
      teamComparison.map((team) => ({
        name: team.name,
        violationsPerMember:
          team.violations /
          (teams.find((t) => t.name === team.name)?.members || 1),
        amountPerMember:
          team.amount / (teams.find((t) => t.name === team.name)?.members || 1),
      })),
    [teamComparison]
  );

  const postData = {
    name: selectedMember,
    rule_broken: selectedRule?.description || "",
    amount: selectedRule?.amount || 0,
    date: date ? format(date, "yyyy-MM-dd") : "",
  };

  //change here
  const handlePost = async () => {
    try {
      await axios.post(
        "https://fund-json.onrender.com/Lannister-Logic-Lords",
        postData
      );
      fetchData();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Baratheon Builders Dashboard</h1>
        <Button
          className="bg-black text-white hover:bg-gray-800"
          onClick={() => router.push("/login")}
        >
          Logout
        </Button>
      </div>

      <h2 className="text-xl mb-4">{format(new Date(), "MMMM yyyy")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Team Contribution
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{amountTotal} </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Rule Breaks
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRuleBreaks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teams.find((t) => t.name === "Lannister Logic Lords")?.members}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Records</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {records.length > 0 ? (
                records.map(({ id, name, rule_broken, date, amount }) => (
                  <li key={id} className="p-2 border rounded-md">
                    {name} - {rule_broken} -{" "}
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    - ৳{amount}
                  </li>
                ))
              ) : (
                <li className="p-2 border rounded-md text-gray-500">
                  No records available
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Record</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-full max-w-[360px]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-full"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="mt-4 bg-black text-white">
                  Add Record {format(date || new Date(), "PP")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] ">
                <DialogHeader>
                  <DialogTitle>
                    Violations on {format(date || new Date(), "PP")}
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4 flex gap-6">
                  <Select onValueChange={(value) => setSelectedMember(value)}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select Team Member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[
                          "Ethan",
                          "Ava",
                          "James",
                          "Isabella",
                          "Benjamin",
                          "Mia",
                          "Alexander",
                          "Charlotte",
                          "Daniel",
                          "Amelia",
                          "Matthew",
                        ].map((member) => (
                          <SelectItem key={member} value={member}>
                            {member}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Select
                    onValueChange={(value) => {
                      const rule = rules.find(
                        (rule) => rule.description === value
                      );
                      if (rule) {
                        setSelectedRule({
                          description: rule.description,
                          amount: rule.amount,
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="w-[470px]">
                      <SelectValue placeholder="Select Violated Rule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {rules.map((rule) => (
                          <SelectItem key={rule.id} value={rule.description}>
                            {rule.description} (${rule.amount})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handlePost}
                  disabled={!selectedMember || !selectedRule}
                >
                  Add Record
                </Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Members Violations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {violations.map(({ member, rulesBroken, amount }) => (
                <li key={member} className="p-2 border rounded-md">
                  {member}: {rulesBroken} rule(s) broken - ৳{amount}{" "}
                  contribution
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rules List</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {rules.map((rule) => (
                <li key={rule.id} className="flex justify-between">
                  <span>{rule.description}</span>
                  <span>{rule.amount} Taka</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Team Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
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
                name="Amount (Taka)"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Rule Breaker Efficiency Index (RBEI)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            The RBEI measures the average rule-breaking intensity per team
            member, providing insights into which teams are most efficient at
            accumulating violations and contributions.
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={violationsPerMember}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="violationsPerMember"
                fill="#8884d8"
                name=" Average Violations per Member"
              />
              <Bar
                yAxisId="right"
                dataKey="amountPerMember"
                fill="#82ca9d"
                name="Average Amount per Member (Taka)"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
