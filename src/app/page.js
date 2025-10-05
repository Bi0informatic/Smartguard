"use client"; // needed to use React hooks in Next.js app dir

import Image from "next/image";
import { useState } from "react";
import Chat from "./components/chat";

export default function Home() {
  const [role, setRole] = useState(""); // store selected role

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-sm sm:text-base mb-1">
              Select Role:
            </label>
            <select
              className="rounded-full border border-black/[.08] dark:border-white/[.145] px-4 py-2 bg-white dark:bg-[#222] text-black dark:text-white focus:outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">-- Select Role --</option>
              <option value="student">Student</option>
              <option value="service">Service Person</option>
            </select>
          </div>

          {role === "student" && (
            <div className="flex items-center gap-2">
            <Chat />

            <input
              type="text"
              placeholder="Type Room Number"
              className="rounded-full border border-gray-300 dark:border-gray-600 bg-background text-foreground px-4 py-2 h-10 sm:h-12 w-64 sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              onClick={() => {
                alert("Alert sent!");
              }}
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Send icon"
                width={20}
                height={20}
              />
              Send Alert
            </button>
          </div>
          )}

          {role === "service" && (
            
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="#"
            >
              <Image
                className="dark:invert"
                src="/eye.png"
                alt="Send icon"
                width={20}
                height={20}
              />
              View Alerts
            </a>
          )}
        </div>

        {/* Extra content depending on role */}
        {role === "student" && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm">
              Send Alerts with room number to notify issues.
            </p>
          </div>
        )}
        {role === "service" && (
          <div className="mt-4 flex flex-col sm:flex-row gap-2 items-center">
            <input
              type="text"
              placeholder="Room Number"
              className="rounded-full border border-black/[.08] dark:border-white/[.145] px-4 py-2 bg-white dark:bg-[#222] text-black dark:text-white focus:outline-none"
            />
            <button
              className="rounded-full bg-blue-600 text-white px-5 py-2 font-medium hover:bg-blue-700 transition-colors"
              type="button"
            >
              Update System
            </button>
          </div>
        )}
        {role === "service" && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm">
              As a service person, you can view and manage alerts submitted by students.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}