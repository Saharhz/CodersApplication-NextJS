"use client";
import React from "react";
import { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { deleteChallenge } from "@/app/challenges/actions/challengeActions";
import { useRouter } from "next/navigation";

type Challenge = {
  id: string;
  title: string;
  category: string;
  level: string;
  createdAt: string;
};

export default function ChallengeList() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:4000/challenges")
      .then((res) => res.json())
      .then((data) => setChallenges(data))
      .catch((err) => console.error("Failed to load challenges", err));
  }, []);
  return (
    <div>
      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-semibold">Your Challenges</h2>
        <Link href="/challenges">
          <Button className="bg-[#23155b] text-white py-2 rounded-md hover:opacity-90 transition mb-3">
            New Challenges
          </Button>
        </Link>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm border border-gray-300">
          <thead className="text-left">
            <tr>
              <th className="p-2 border border-gray-300">Title</th>
              <th className="p-2 border border-gray-300">Category</th>
              <th className="p-2 border border-gray-300">Difficulty</th>
              <th className="p-2 border border-gray-300">CreatedAt</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((challenge) => (
              <tr key={challenge.id}>
                <td className="p-2 border border-gray-300">
                  {challenge.title}
                </td>
                <td className="p-2 border border-gray-300">
                  {challenge.category}
                </td>
                <td className="p-2 border border-gray-300">
                  {challenge.level}
                </td>
                <td className="p-2 border border-gray-300">
                  {new Date(challenge.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 space-x-2 border border-gray-300">
                  <Link href={`/challenges/${challenge.id}/edit`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-[#23155b] text-white"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="icon"
                    disabled={isPending}
                    onClick={() => {
                      const confirmed = confirm(
                        "Are you sure you want to delete this challenge?"
                      );
                      if (!confirmed) return;

                      startTransition(async () => {
                        const res = await deleteChallenge(challenge.id);
                        if (res.success) {
                          router.refresh();
                          toast({ title: "Challenge deleted" });
                        } else {
                          toast({
                            title: "Failed to delete challenge",
                            description: res.error,
                            variant: "destructive",
                          });
                        }
                      });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
