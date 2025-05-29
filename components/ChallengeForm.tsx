"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MarkdownEditor from "./MarkdownEditor";
import CodeEditor from "./CodeEditor";
import LanguageMenu from "./LanguageMenu";
import FontSizeMenu from "./FontSizeMenu";
import { useToast } from "@/hooks/use-toast";
import TestCaseList, { TestCase } from "./TestCaseList";
import { string } from "zod";
import Link from "next/link";

export type Challenge = {
  id?: number;
  title: string;
  category: string;
  level: string;
  description: string;
  functionName: string;
  code: string;
  tests: TestCase[];
};

type Props = {
  mode: "create" | "edit";
  initialData?: Challenge;
};

export default function ChallengeForm({ mode, initialData }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [level, setLevel] = useState(initialData?.level || "Easy");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [code, setCode] = useState(String(initialData?.code || ""));
  const [functionName, setFunctionName] = useState(
    initialData?.functionName || ""
  );
  const [testCases, setTestCases] = useState<TestCase[]>(
    initialData?.tests || []
  );

  const { toast } = useToast();

  const updateTestCase = (
    index: number,
    field: keyof (typeof testCases)[0],
    value: any
  ) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    setTestCases(updated);
  };

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      { type: "string", name: "", value: "", output: "", weight: 0.5 },
    ]);
  };

  const removeTestCase = (index: number) => {
    const updated = testCases.filter((_, i) => i !== index);
    setTestCases(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const challenge = {
      title,
      category,
      level,
      description,
      functionName,
      code,
      tests: testCases,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:4000/challenges", {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(challenge),
      });

      if (!res.ok) throw new Error("Failed to create challenge");

      toast({
        title: `Challenge ${
          mode === "edit" ? "updated" : "created"
        } successfully!`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: String(err),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6">
        {mode === "edit" ? "Edit challenges" : "Create new challenge"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-8 w-full"
      >
        <div className="w-full md:w-1/2 space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            ></Input>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="category"
            ></Input>
          </div>
          <div>
            <Label htmlFor="level">Level</Label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="border border-gray-200 rounded-md p-2 w-full"
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          {/*  CodeMirror at the left side of the page  */}
          <div>
            <Label>Description</Label>
            <MarkdownEditor value={description} onChange={setDescription} />
          </div>
        </div>

        {/* Language & Font Size Menus at the right side */}
        <div className="w-full md:w-1/2 space-y-4">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div className="w-full">
                <Label htmlFor="functionName">Function name</Label>
                <Input
                  id="functionName"
                  value={functionName}
                  onChange={(e) => setFunctionName(e.target.value)}
                />
              </div>
              <Link href="/dashboard">
                <Button
                  type="submit"
                  className="whitespace-nowrap bg-[#23155b] text-white"
                >
                  {mode === "edit" ? "Edit" : "Create"}
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <LanguageMenu />
              <FontSizeMenu />
            </div>
            <CodeEditor value={code} onChange={setCode} />
          </div>

          {/* Test Cases Section on the right side*/}
          <div>
            <TestCaseList
              testCases={testCases}
              onUpdate={updateTestCase}
              onRemove={removeTestCase}
              onAdd={addTestCase}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
