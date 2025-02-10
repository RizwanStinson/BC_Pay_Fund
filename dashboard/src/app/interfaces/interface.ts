export interface ILogin {
  email: string;
  password: string;
}




"use client";
import { useState, useMemo, useEffect } from "react";
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
import axios from "axios";

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
  { id: 14, description: "Eating others snacks", amount: 0 }, // Amount varies
  { id: 15, description: "Strong-smelling food", amount: 50 },
  { id: 16, description: "Not replacing tissue/toilet paper", amount: 100 },
  { id: 17, description: "Unmuted on video call", amount: 50 },
];

const mockViolations = [
  { member: "Alice", rulesBroken: 5, amount: 350 },
  { member: "Bob", rulesBroken: 3, amount: 200 },
  { member: "Charlie", rulesBroken: 7, amount: 500 },
  { member: "David", rulesBroken: 2, amount: 150 },
  { member: "Eve", rulesBroken: 4, amount: 300 },
  { member: "Frank", rulesBroken: 1, amount: 50 },
  { member: "Grace", rulesBroken: 6, amount: 400 },
  { member: "Henry", rulesBroken: 3, amount: 250 },
  { member: "Ivy", rulesBroken: 2, amount: 100 },
  { member: "Jack", rulesBroken: 5, amount: 350 },
];

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedRule, setSelectedRule] = useState("");
  const [amountTotal, setAmountTotal] = useState(0);
  const [totalRuleBreaks, setTotalRuleBreaks] = useState(0);
  const [violationsData, setViolationsData] = useState([]);
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [isViewViolationsOpen, setIsViewViolationsOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://fund-json.onrender.com/Stark-Coders"
      );
      if (Array.isArray(response.data)) {
        let totalAmount = 0;
        let ruleFrequency = {};
        let totalRuleBreaks = 0;
        response.data.forEach(({ amount, rule_broken }) => {
          totalAmount += amount;
          ruleFrequency[rule_broken] = (ruleFrequency[rule_broken] || 0) + 1;
        });
        totalRuleBreaks = Object.values(ruleFrequency).reduce(
          (acc, curr) => acc + curr,
          0
        );
        console.log("Total Amount:", totalAmount);
        console.log("Rule Frequency:", ruleFrequency);
        setAmountTotal(totalAmount);
        setTotalRuleBreaks(totalRuleBreaks);
        setViolationsData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewViolations = () => {
    const filteredViolations = violationsData.filter(
      (record) => record.date === format(date, "yyyy-MM-dd")
    );
    if (filteredViolations.length > 0) {
      setIsViewViolationsOpen(true);
    } else {
      alert("No violations recorded for this date.");
    }
  };

  const handleAddRecord = () => {
    setIsAddRecordOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Stark Coders Dashboard</h1>
        <Button onClick={() => (window.location.href = "/login")}>
          Logout
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 p-4 gap-4">
        {/* Left Section: Calendar */}
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Violation Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <div className="mt-4 flex justify-between">
                <Button onClick={handleViewViolations}>View Violations</Button>
                <Button onClick={handleAddRecord}>Add Record</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Recent Records */}
        <div className="w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Select a date to view recent records.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* View Violations Popup */}
      <Dialog
        open={isViewViolationsOpen}
        onOpenChange={setIsViewViolationsOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Violations on {format(date, "PP")}</DialogTitle>
          </DialogHeader>
          <ul>
            {violationsData
              .filter((record) => record.date === format(date, "yyyy-MM-dd"))
              .map((record, index) => (
                <li key={index}>
                  {record.member} - {record.rule_broken} ({record.amount} Taka)
                </li>
              ))}
          </ul>
        </DialogContent>
      </Dialog>

      {/* Add Record Popup */}
      <Dialog open={isAddRecordOpen} onOpenChange={setIsAddRecordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Record</DialogTitle>
          </DialogHeader>set
          <div className="space-y-4">
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Member</option>
              {mockViolations.map((member) => (
                <option key={member.member} value={member.member}>
                  {member.member}
                </option>
              ))}
            </select>
            <select
              value={selectedRule}
              onChange={(e) => setSelectedRule(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Rule</option>
              {rules.map((rule) => (
                <option key={rule.id} value={rule.description}>
                  {rule.description}
                </option>
              ))}
            </select>
            <Button>Add</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}