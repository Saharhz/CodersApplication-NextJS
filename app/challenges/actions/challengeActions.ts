"use server";

import React from "react";
import { revalidatePath } from "next/cache";

export async function deleteChallenge(id: string) {
  try {
    const res = await fetch(`http://localhost:4000/challenges/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete challenges");
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
