"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  // router.push() Perform a client-side navigation to the provided route.
  // redirect to signin page after Logout
  const handleLogout = () => {
    router.push("/signin");
  };

  return (
    <nav className="flex justify-between items-center bg-[#d9d5d5] text-black px-6 py-4">
      <Link href="/" className="text-xl font-semibold hover:underline">
        Challenges
      </Link>
      <Button onClick={handleLogout} className="bg-[#23155b] text-white">
        Logout
      </Button>
    </nav>
  );
}
