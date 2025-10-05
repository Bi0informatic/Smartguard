"use client"; // needed to use React hooks in Next.js app dir

import Image from "next/image";
import { useState } from "react";

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
          {/* Role Selector */}
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

          {/* Conditional Buttons */}
          {role === "student" && (
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="#"
            >
              <Image
                className="dark:invert"
                src="/vercel.svg"
                alt="Send icon"
                width={20}
                height={20}
              />
              Send Alert Now!
            </a>
          )}

          {role === "service" && (
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="#"
            >
              View Alerts
            </a>
          )}
        </div>

        {/* Extra content depending on role */}
        {role === "student" && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-sm">
              🧑‍🎓 As a student, you can send alerts to request help or report an issue.
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
              🧰 As a service person, you can view and manage alerts submitted by students.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}