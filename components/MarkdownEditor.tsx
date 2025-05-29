import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MarkdownEditor({ value, onChange }: Props) {
  return (
    <div>
      <SimpleMDE
        value={value}
        onChange={onChange}
        options={{
          spellChecker: false,
          status: false,
        }}
      />
    </div>
  );
}
