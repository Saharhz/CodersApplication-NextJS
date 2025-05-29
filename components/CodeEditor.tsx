import React from "react";
import { useSelector } from "react-redux";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { EditorView } from "codemirror";
import CodeMirror from "@uiw/react-codemirror";
import { RootState } from "@/redux/store";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function CodeEditor({ value, onChange }: Props) {
  const { language, fontSize } = useSelector(
    (state: RootState) => state.workspace
  );

  const extensions = [
    language === "javascript" ? javascript() : python(),
    EditorView.theme({
      "&": {
        fontSize: `${fontSize}px`,
      },
    }),
  ];
  return (
    <CodeMirror
      value={value}
      height="300px"
      extensions={extensions}
      onChange={(val) => onChange(val)}
    />
  );
}
