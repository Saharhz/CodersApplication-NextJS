"use client";

import ChallengeForm from "@/components/ChallengeForm";

export default function EditChallengeFormWrapper({
  challenge,
}: {
  challenge: any;
}) {
  return <ChallengeForm mode="edit" initialData={challenge} />;
}
