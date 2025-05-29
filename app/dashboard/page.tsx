import React from "react";
import ChallengeList from "@/components/ChallengeList";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <ChallengeList />
      </div>
    </div>
  );
}
