import EditChallengeFormWrapper from "@/components/EditChallengeFormWrapper";
import Navbar from "@/components/Navbar";

async function getChallenge(id: string) {
  const res = await fetch(`http://localhost:4000/challenges/${id}`);
  if (!res.ok) throw new Error("Failed to fetch challenge");
  return res.json();
}

export default async function EditChallengePage({
  params,
}: {
  params: { id: string };
}) {
  const challenge = await getChallenge(params.id);

  return (
    <div className="p-4">
      <Navbar />
      <EditChallengeFormWrapper challenge={challenge} />
    </div>
  );
}
