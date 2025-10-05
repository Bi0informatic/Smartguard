"use client";


import Image from "next/image";
import { useState } from "react";
import Chat from "./components/chat";
import Login from "./components/login";
import CameraFeature from './components/CameraFeature';

export default function Home() {
  const [role, setRole] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");

 const handleLogin = ({ username, role }) => {
    setLoggedIn(true);
    setRole(role);
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start" style={{ minHeight: '100vh', padding: '40px' }}>

        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <CameraFeature />

        {/* LOGIN SCREEN */}
        {!loggedIn && <Login onLogin={handleLogin} />}

        {/* MAIN APP AFTER LOGIN */}
        {loggedIn && (
          <>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-sm sm:text-base mb-1">
                  Role: {role === "student" ? "Student" : "Service Person"}
                </label>
              </div>

              {role === "student" && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type Room Number"
                    className="rounded-full border border-gray-300 dark:border-gray-600 bg-background text-foreground px-4 py-2 h-10 sm:h-12 w-64 sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                  {
                    //input prop of Chat component should be string of room number
                  }
                  <Chat role="Student" icon={<Image className="dark:invert" src="/vercel.svg" alt="Send icon" width={20} height={20}/>} type="alert" text="alert" input={roomNumber}/>
                </div>
              )}

              {role === "service" && (
                <Chat role="Service" icon={<Image className="dark:invert" src="/eye.png" alt="Send icon" width={20} height={20}/>} text="View Alerts" type="view-alerts" input=""/>
              )}
            </div>

            {/* Extra content */}
            {role === "student" && (
              <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <p className="text-sm">
                  Send Alerts with room number to notify issues.
                </p>
              </div>
            )}

            {role === "service" && (
              <>
                <div className="mt-4 flex flex-col sm:flex-row gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Room Number"
                    className="rounded-full border border-black/[.08] dark:border-white/[.145] px-4 py-2 bg-white dark:bg-[#222] text-black dark:text-white focus:outline-none"
                  />
                  {/* <button
                    className="rounded-full bg-blue-600 text-white px-5 py-2 font-medium hover:bg-blue-700 transition-colors"
                    type="button"
                  >
                    Update System               !!! Please change image below !!!
                  </button> */}
                  {
                    //input prop of Chat component should be string of room number
                  }
                  <Chat role="Service" icon={<Image className="dark:invert" src="/vercel.svg" alt="Send icon" width={20} height={20}/>} text="Update System" type="update-system"/>
                </div>
                <div className="mt-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-sm">
                    As a service person, you can view and manage alerts submitted by students.
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
