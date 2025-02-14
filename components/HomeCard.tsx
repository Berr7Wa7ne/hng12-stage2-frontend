"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import LineChart from "@/components/LineChart";
import Link from "next/link";

const HomeCard = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [ticketCount, setTicketCount] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const tickets = [
    {
      type: "Regular",
      price: "Free",
      access: "REGULAR ACCESS",
      available: "20/52",
    },
    { type: "VIP", price: "$150", access: "VIP ACCESS", available: "20/52" },
    { type: "VVIP", price: "$150", access: "VVIP ACCESS", available: "20/52" },
  ];

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!selectedTicket || !ticketCount) {
      e.preventDefault();
      setError("Please select a ticket type and number of tickets.");
    } else {
      setError("");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-custom-teal bg-opacity-20  border-opacity-20 border border-custom-cyan text-white p-6 rounded-3xl shadow-lg">
      <div className="mt-4">
        <LineChart />
      </div>

      <div className="mt-4 p-4 bg-gradient-to-r from-custom-cyan/20 to-custom-teal/5 rounded-xl text-center border border-opacity-20 border-custom-cyan">
        <h3 className="text-2xl font-bold font-grunge italic">
          Techember Fest &quot;25
        </h3>
        <p className="text-[10px] mt-2">
          Join us for an unforgettable experience at <br />
          [Event Name]! Secure your spot now.
        </p>
        <p className="text-xs mt-2">
          📍 [Event Location] || March 15, 2025 | 7:00 PM
        </p>
      </div>

      <div className="border border-opacity-20 border-custom-cyan w-full my-5"></div>

      <h3 className="text-sm">Select Ticket Type:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 w-full p-4 border border-custom-cyan/20 rounded-2xl">
        {tickets.map((ticket) => (
          <button
            key={ticket.type}
            onClick={() => setSelectedTicket(ticket.type)}
            className={`p-3 rounded-lg text-left border-custom-cyan/20 border w-full ${
              selectedTicket === ticket.type
                ? "bg-custom-cyan bg-opacity-20"
                : "bg-none"
            } hover:bg-custom-cyan/20 transition duration-200`}
          >
            <p className="text-base font-bold mb-2">{ticket.price}</p>
            <p className="text-[10px]">{ticket.access}</p>
            <p className="text-[10px]">{ticket.available}</p>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-sm text-white">Number of Tickets</h3>
        <Select onValueChange={(value) => setTicketCount(Number(value))}>
          <SelectTrigger className="w-full text-white border border-custom-cyan/20">
            <SelectValue
              className="text-[8px] text-custom-cyan"
              placeholder="Select number of tickets"
            />
          </SelectTrigger>
          <SelectContent className="bg-custom-dark roundes-2xl text-white border border-custom-cyan/20">
            {[...Array(3).keys()].map((num) => (
              <SelectItem
                key={num + 1}
                value={(num + 1).toString()}
                className="hover:bg-custom-cyan text-white"
              >
                {num + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4 w-full">
        <Button variant="ocx" className="w-full sm:w-1/2">
          <Link href="/">Cancel</Link>
        </Button>
        <Button
          variant="berry"
          className="w-full sm:w-1/2"
          onClick={handleNextClick}
        >
          <Link href={selectedTicket && ticketCount ? "/details" : "#"}>
            Next
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HomeCard;
