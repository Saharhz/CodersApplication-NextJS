"use client";
import React from "react";
import { Button } from "./ui/button";
import TestCaseItem from "./TestCaseItem";

export type TestCase = {
  type: "string" | "number";
  name: string;
  value: string;
  output: string;
  weight: number;
};

export default function TestCaseList({
  testCases,
  onUpdate,
  onRemove,
  onAdd,
}: {
  testCases: TestCase[];
  onUpdate: (index: number, field: keyof TestCase, value: any) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Tests</h4>
        <Button
          type="button"
          onClick={onAdd}
          className="bg-[#23155b] text-white"
        >
          +
        </Button>
      </div>
      {testCases.map((test, index) => (
        <TestCaseItem
          key={index}
          index={index}
          test={test}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
