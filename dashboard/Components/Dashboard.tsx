// "use client";

// import { useState, useMemo } from "react";
// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { AlertTriangle, DollarSign, Users } from "lucide-react";

// const teams = [
//   { name: "Stark Coders", members: 10 },
//   { name: "Lannister Logic Lords", members: 11 },
//   { name: "Targaryen Debuggers", members: 11 },
//   { name: "Baratheon Builders", members: 7 },
//   { name: "Tyrell Technocrats", members: 8 },
//   { name: "Martell Mavericks", members: 6 },
// ];

// const rules = [
//   { id: 1, description: "Fashionably late to meetings", amount: 200 },
//   { id: 2, description: "Shoes outside the rack", amount: 50 },
//   { id: 3, description: "Empty water bottle in fridge", amount: 50 },
//   { id: 4, description: "Abandoned coffee mug", amount: 30 },
//   { id: 5, description: "Late return of borrowed items", amount: 100 },
//   { id: 6, description: "Phone ringing during meetings", amount: 50 },
//   { id: 7, description: "Lights/fans on in empty room", amount: 50 },
//   { id: 8, description: "Dodging snack buying turn", amount: 200 },
//   { id: 9, description: "Messy workspace", amount: 75 },
//   { id: 10, description: "Forgetting to lock door", amount: 150 },
//   { id: 11, description: "Speaking loudly on phone", amount: 50 },
//   { id: 12, description: "Ignoring group messages", amount: 30 },
//   { id: 13, description: "Borrowing without permission", amount: 100 },
//   { id: 14, description: "Eating others snacks", amount: 0 }, 
//   { id: 15, description: "Strong-smelling food", amount: 50 },
//   { id: 16, description: "Not replacing tissue/toilet paper", amount: 100 },
//   { id: 17, description: "Unmuted on video call", amount: 50 },
// ];

// const mockViolations = [
//   { member: "Alice", rulesBroken: 5, amount: 350 },
//   { member: "Bob", rulesBroken: 3, amount: 200 },
//   { member: "Charlie", rulesBroken: 7, amount: 500 },
//   { member: "David", rulesBroken: 2, amount: 150 },
//   { member: "Eve", rulesBroken: 4, amount: 300 },
//   { member: "Frank", rulesBroken: 1, amount: 50 },
//   { member: "Grace", rulesBroken: 6, amount: 400 },
//   { member: "Henry", rulesBroken: 3, amount: 250 },
//   { member: "Ivy", rulesBroken: 2, amount: 100 },
//   { member: "Jack", rulesBroken: 5, amount: 350 },
// ];

// const teamComparison = [
//   { name: "Stark Coders", violations: 38, amount: 2650 },
//   { name: "Lannister Logic Lords", violations: 42, amount: 2900 },
//   { name: "Targaryen Debuggers", violations: 35, amount: 2400 },
//   { name: "Baratheon Builders", violations: 28, amount: 1950 },
//   { name: "Tyrell Technocrats", violations: 30, amount: 2100 },
//   { name: "Martell Mavericks", violations: 25, amount: 1750 },
// ];

// export default function Dashboard() {
//   const [date, setDate] = useState<Date | undefined>(new Date());
//   const [selectedMember, setSelectedMember] = useState<string>("");
//   const [selectedRule, setSelectedRule] = useState<string>("");

//   const totalViolations = mockViolations.reduce(
//     (sum, member) => sum + member.rulesBroken,
//     0
//   );
//   const totalAmount = mockViolations.reduce(
//     (sum, member) => sum + member.amount,
//     0
//   );

//   const sortedViolations = useMemo(
//     () => [...mockViolations].sort((a, b) => a.rulesBroken - b.rulesBroken),
//     []
//   );

//   const violationsPerMember = useMemo(
//     () =>
//       teamComparison.map((team) => ({
//         name: team.name,
//         violationsPerMember:
//           team.violations / teams.find((t) => t.name === team.name)!.members,
//         amountPerMember:
//           team.amount / teams.find((t) => t.name === team.name)!.members,
//       })),
//     [teamComparison]
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Stark Coders Dashboard</h1>
//       <h2 className="text-xl mb-4">{format(new Date(), "MMMM yyyy")}</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Contribution
//             </CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{totalAmount} Taka</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Rule Breaks
//             </CardTitle>
//             <AlertTriangle className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{totalViolations}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Team Members</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {teams.find((t) => t.name === "Stark Coders")?.members}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <Card className="md:col-span-2">
//           <CardHeader>
//             <CardTitle>Violation Calendar</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Calendar
//               mode="single"
//               selected={date}
//               onSelect={setDate}
//               className="rounded-md border w-full"
//             />
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button variant="outline" className="mt-4">
//                   View Violations for {format(date || new Date(), "PP")}
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                   <DialogTitle>
//                     Violations on {format(date || new Date(), "PP")}
//                   </DialogTitle>
//                 </DialogHeader>
//                 <div className="py-4">
//                   {/* Here you would typically fetch and display violations for the selected date */}
//                   <p>No violations recorded for this date.</p>
//                 </div>
//               </DialogContent>
//             </Dialog>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Team Members Violations</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ul className="space-y-2">
//               {sortedViolations.map((member) => (
//                 <li key={member.member} className="flex justify-between">
//                   <span>{member.member}</span>
//                   <span>
//                     {member.rulesBroken} violations, {member.amount} Taka
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Rules List</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ul className="space-y-2 max-h-96 overflow-y-auto">
//               {rules.map((rule) => (
//                 <li key={rule.id} className="flex justify-between">
//                   <span>{rule.description}</span>
//                   <span>{rule.amount} Taka</span>
//                 </li>
//               ))}
//             </ul>
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Team Comparison</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={teamComparison}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//               <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//               <Tooltip />
//               <Legend />
//               <Bar
//                 yAxisId="left"
//                 dataKey="violations"
//                 fill="#8884d8"
//                 name="Violations"
//               />
//               <Bar
//                 yAxisId="right"
//                 dataKey="amount"
//                 fill="#82ca9d"
//                 name="Amount (Taka)"
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Rule Breaker Efficiency Index (RBEI)</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="mb-4 text-sm text-muted-foreground">
//             The RBEI measures the average rule-breaking intensity per team
//             member, providing insights into which teams are most efficient at
//             accumulating violations and contributions.
//           </p>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={violationsPerMember}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//               <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//               <Tooltip />
//               <Legend />
//               <Bar
//                 yAxisId="left"
//                 dataKey="violationsPerMember"
//                 fill="#8884d8"
//                 name="Violations per Member"
//               />
//               <Bar
//                 yAxisId="right"
//                 dataKey="amountPerMember"
//                 fill="#82ca9d"
//                 name="Amount per Member (Taka)"
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchTeamData, addViolation } from "../redux/slices/teamSlice";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { format } from "date-fns";

const teamMembers = {
  "Stark-Coders": [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
  ],
  "Lannister-Logic-Lords": [
    "Tyrion",
    "Cersei",
    "Jaime",
    "Tywin",
    "Kevan",
    "Lancel",
    "Myrcella",
    "Tommen",
    "Joffrey",
    "Genna",
    "Stafford",
  ],
  "Targaryen-Debuggers": [
    "Daenerys",
    "Jon",
    "Aegon",
    "Rhaegar",
    "Viserys",
    "Rhaella",
    "Aemon",
    "Rhaenys",
    "Visenya",
    "Jaehaerys",
    "Alysanne",
  ],
  "Baratheon-Builders": [
    "Robert",
    "Stannis",
    "Renly",
    "Gendry",
    "Shireen",
    "Joffrey",
    "Myrcella",
  ],
  "Tyrell-Technocrats": [
    "Margaery",
    "Loras",
    "Mace",
    "Olenna",
    "Garlan",
    "Willas",
    "Alerie",
    "Luthor",
  ],
  "Martell-Mavericks": [
    "Oberyn",
    "Doran",
    "Elia",
    "Trystane",
    "Arianne",
    "Quentyn",
  ],
};

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
  { id: 14, description: "Eating others snacks", amount: 100 },
  { id: 15, description: "Strong-smelling food", amount: 50 },
  { id: 16, description: "Not replacing tissue/toilet paper", amount: 100 },
  { id: 17, description: "Unmuted on video call", amount: 50 },
];

const teamComparison = [
  { name: "Stark Coders", violations: 38, amount: 2650 },
  { name: "Lannister Logic Lords", violations: 42, amount: 2900 },
  { name: "Targaryen Debuggers", violations: 35, amount: 2400 },
  { name: "Baratheon Builders", violations: 28, amount: 1950 },
  { name: "Tyrell Technocrats", violations: 30, amount: 2100 },
  { name: "Martell Mavericks", violations: 25, amount: 1750 },
];

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { team } = useSelector((state: RootState) => state.auth);
  const { members, loading } = useSelector((state: RootState) => state.team);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [selectedRule, setSelectedRule] = useState<string>("");

  useEffect(() => {
    if (team) {
      dispatch(fetchTeamData(team));
    }
  }, [dispatch, team]);

  const handleAddViolation = () => {
    if (team && selectedMember && selectedRule && date) {
      const ruleObj = rules.find((r) => r.id.toString() === selectedRule);
      if (ruleObj) {
        dispatch(
          addViolation({
            team,
            data: {
              name: selectedMember,
              rule_broken: ruleObj.description,
              amount: ruleObj.amount,
              date: format(date, "yyyy-MM-dd"),
            },
          })
        );
      }
    }
  };

  const totalViolations = members.length;
  const totalAmount = members.reduce((sum, member) => sum + member.amount, 0);

  const violationsForSelectedDate = members.filter(
    (member) => member.date === format(date || new Date(), "yyyy-MM-dd")
  );

  const violationsPerMember = teamComparison.map((team) => ({
    name: team.name,
    violationsPerMember:
      team.violations /
      teamMembers[team.name.replace(" ", "-") as keyof typeof teamMembers]
        .length,
    amountPerMember:
      team.amount /
      teamMembers[team.name.replace(" ", "-") as keyof typeof teamMembers]
        .length,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        {team?.replace("-", " ")} Dashboard
      </h1>
      <h2 className="text-xl mb-4">{format(new Date(), "MMMM yyyy")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Contribution
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmount} Taka</div>
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
            <div className="text-2xl font-bold">{totalViolations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamMembers[team as keyof typeof teamMembers]?.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Violation Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border w-full"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-4">
                  View/Add Violations for {format(date || new Date(), "PP")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    Violations on {format(date || new Date(), "PP")}
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  {violationsForSelectedDate.length > 0 ? (
                    <ul>
                      {violationsForSelectedDate.map((violation, index) => (
                        <li key={index}>
                          {violation.name}: {violation.rule_broken} -{" "}
                          {violation.amount} Taka
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No violations recorded for this date.</p>
                  )}
                  <div className="mt-4">
                    <h3 className="font-bold">Add New Violation</h3>
                    <Select onValueChange={setSelectedMember}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select member" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers[team as keyof typeof teamMembers]?.map(
                          (member) => (
                            <SelectItem key={member} value={member}>
                              {member}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <Select onValueChange={setSelectedRule}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rule" />
                      </SelectTrigger>
                      <SelectContent>
                        {rules.map((rule) => (
                          <SelectItem key={rule.id} value={rule.id.toString()}>
                            {rule.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddViolation}>Add Violation</Button>
                  </div>
                </div>
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
              {members
                .sort((a, b) => a.amount - b.amount)
                .map((member, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{member.name}</span>
                    <span>{member.amount} Taka</span>
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
                name="Violations per Member"
              />
              <Bar
                yAxisId="right"
                dataKey="amountPerMember"
                fill="#82ca9d"
                name="Amount per Member (Taka)"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;