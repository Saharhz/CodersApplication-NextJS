"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setLanguage } from "@/redux/workspaceSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

export default function LanguageMenu() {
  const language = useSelector((state: RootState) => state.workspace.language);
  const dispatch = useDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Language: {language}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => dispatch(setLanguage("javascript"))}>
          Javascript
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setLanguage("python"))}>
          Python
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
