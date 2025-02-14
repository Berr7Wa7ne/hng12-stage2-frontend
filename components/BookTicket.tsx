"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ProgressBar from "@/components/LineChart";
import barcode from "../public/barcode.png";

const BookTicket = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Unknown";
  const email = searchParams.get("email") || "Not provided";
  const message = searchParams.get("message") || "No message";
  const avatarUrl = searchParams.get("avatarUrl") || "/default-avatar.png";

  return (
    <div className="max-w-lg mx-auto bg-custom-teal bg-opacity-20 border border-custom-cyan/20 text-white p-6 rounded-3xl shadow-lg flex flex-col items-center justify-center">
      <ProgressBar
        title="Attendee Details"
        currentStep={3}
        totalSteps={3}
        width="100%"
      />
      <div className="my-5 md:my-20 items-center text-center space-y-2">
        <h1 className="text-lg">Your Ticket is Booked</h1>
        <p className="text-xs">
          Check your email for a copy or you can{" "}
          <span className="font-bold">download.</span>
        </p>
      </div>
      <div className="relative w-[600px] h-[600px] text-white flex flex-col items-center justify-center">
        <div
          id="background"
          className="absolute inset-0 bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: "url('/Subtract.png')" }}
        ></div>
        <div id="content" className="relative z-10 text-center px-3 py-7">
          <div className="border border-custom-cyan p-3 h-[450px] w-[270px] mb-[110px] rounded-2xl">
            <h2 className="text-2xl font-bold font-grunge italic">
              Techember Fest &quot;25
            </h2>
            <div className="text-[10px] space-y-2 mt-2">
              <p className="">📍 04 Rumens Road, Ikoyi, Lagos</p>
              <p className="">📅 March 15, 2025 | 7:00 PM</p>
            </div>
            <div className="h-[125px] w-[125px] border-[5px] rounded-2xl border-custom-cyan flex items-center justify-center my-3 mx-auto">
              <Image
                src={avatarUrl}
                alt="Avatar Image"
                height={120}
                width={120}
                className="rounded-xl"
              />
            </div>
            <div
              id="table"
              className="border border-custom-cyan p-3 rounded-xl text-left text-[10px] space-y-3 mt-4"
            >
              <div className="grid grid-cols-2 gap-2 border-b border-custom-cyan pb-2">
                <div>
                  <p className="text-gray-400">Enter your name</p>
                  <p className="font-bold">{name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Enter your email *</p>
                  <p className="font-bold">{email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-custom-cyan pb-2">
                <div>
                  <p className="text-gray-400">Ticket Type:</p>
                  <p className="font-bold">VIP</p>
                </div>
                <div>
                  <p className="text-gray-400">Ticket for :</p>
                  <p className="font-bold">1</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400">Special request?</p>
                <p className="italic">{message}</p>
              </div>
            </div>
            <Image
              src={barcode}
              alt="barcode"
              height={500}
              width={500}
              className="mt-[90px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTicket;