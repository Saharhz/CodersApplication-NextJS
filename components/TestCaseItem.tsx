"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type TestCase = {
  type: "string" | "number";
  name: string;
  value: string;
  output: string;
  weight: number;
};

export default function TestCaseItem({
  index,
  test,
  onUpdate,
  onRemove,
}: {
  index: number;
  test: TestCase;
  onUpdate: (index: number, field: keyof TestCase, value: any) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="flex items-start gap-3 border p-4 rounded-md">
      <Button
        type="button"
        variant="destructive"
        size="icon"
        onClick={() => onRemove(index)}
        className="mt-10"
        asChild={false}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
      <div className="grid grid-cols-2 gap-4 w-full">
        <div>
          <label className="text-sm font-medium">Type</label>
          <select
            value={test.type}
            onChange={(e) => onUpdate(index, "type", e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="string">string</option>
            <option value="number">number</option>
          </select>

          <label className="text-sm font-medium mt-2 block">Value</label>
          <Input
            value={test.value}
            onChange={(e) => onUpdate(index, "value", e.target.value)}
            placeholder="Value"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Name</label>
          <Input
            value={test.name}
            onChange={(e) => onUpdate(index, "name", e.target.value)}
            placeholder="Name"
          />

          <label className="text-sm font-medium mt-2 block">Output</label>
          <Input
            value={test.output}
            onChange={(e) => onUpdate(index, "output", e.target.value)}
            placeholder="Output"
          />

          <label className="text-sm font-medium mt-2 block">Weight</label>
          <Input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={test.weight}
            onChange={(e) =>
              onUpdate(index, "weight", parseFloat(e.target.value))
            }
            placeholder="Weight"
          />
        </div>
      </div>
    </div>
  );
}
