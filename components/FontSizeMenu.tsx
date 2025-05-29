"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setFontSize } from "@/redux/workspaceSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export default function FontSizeMenu() {
  const fontSize = useSelector((state: RootState) => state.workspace.fontSize);
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Font: {fontSize}px</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {[12, 14, 16, 18, 20].map((size) => (
          <DropdownMenuItem
            key={size}
            onClick={() => dispatch(setFontSize(size))}
          >
            {size}px
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
