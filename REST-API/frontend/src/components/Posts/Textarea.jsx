import { useEffect, useRef } from "react";

function TextArea({ text, onChange }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  });

  return (
    <textarea
      className="text-area"
      value={text}
      ref={textareaRef}
      onChange={(e) => {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        onChange(e);
      }}
    />
  );
}

export default TextArea;
