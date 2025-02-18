"use client";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";

import {
  undoIcon,
  redoIcon,
  underline,
  bold,
  italic,
  numberedList,
  listBullet,
  bars,
  barsLeft,
  barsRight,
  barsCenterLeft,
  barsCenterRight,
  textAaIcon,
} from "./icons";

export default function Part3() {
  const t = useTranslations("Part3");

  // State for current text value
  const [text, setText] = useState("");
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Ref for textarea
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Undo/Redo history
  const history = useRef<string[]>([""]);
  const historyIndex = useRef<number>(0);

  // Handle text changes
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);

    // Maintain history stack
    if (historyIndex.current < history.current.length - 1) {
      history.current = history.current.slice(0, historyIndex.current + 1);
    }
    history.current.push(newText);
    historyIndex.current++;
  };

  // Undo function
  const undo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current--;
      setText(history.current[historyIndex.current]);
    }
  };

  // Redo function
  const redo = () => {
    if (historyIndex.current < history.current.length - 1) {
      historyIndex.current++;
      setText(history.current[historyIndex.current]);
    }
  };

  // Formatting function
  const applyFormatting = (type: "numbered" | "bullet") => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd, value } = textarea;
    if (selectionStart === selectionEnd) return;

    const selectedText = value.substring(selectionStart, selectionEnd);
    let formattedText = selectedText;

    if (type === "numbered") {
      formattedText = selectedText
        .split("\n")
        .map((line, index) => `${index + 1}. ${line}`)
        .join("\n");
    } else if (type === "bullet") {
      formattedText = selectedText
        .split("\n")
        .map((line) => `• ${line}`)
        .join("\n");
    }

    const newText =
      value.substring(0, selectionStart) +
      formattedText +
      value.substring(selectionEnd);
    setText(newText);
  };

  // Button click handler
  const handleButtonClick = (name: string, action: () => void) => {
    setActiveButton(name);
    action();
  };

  const editorControllers = [
    {
      icon: numberedList,
      name: "numberedList",
      onClick: () => applyFormatting("numbered"),
    },
    {
      icon: listBullet,
      name: "listBullet",
      onClick: () => applyFormatting("bullet"),
    },
    { icon: barsCenterLeft, name: "barsCenterLeft", onClick: () => {} },
    { icon: barsLeft, name: "barsLeft", onClick: () => {} },
    { icon: bars, name: "bars", onClick: () => {} },
    { icon: barsRight, name: "barsRight", onClick: () => {} },
    { icon: barsCenterRight, name: "barsCenterRight", onClick: () => {} },
    { icon: textAaIcon, name: "textAaIcon", onClick: () => {} },
    { icon: bold, name: "bold", onClick: () => {} },
    { icon: italic, name: "italic", onClick: () => {} },
    { icon: underline, name: "underline", onClick: () => {} },
    { icon: undoIcon, name: "undo", onClick: undo },
    { icon: redoIcon, name: "redo", onClick: redo },
  ];

  return (
    <>
      <div className="flex items-center bg-background px-6 lg:px-12 md:px-12 pt-4">
        <span className="w-[64px] h-[4px] bg-customPurple rounded-sm"></span>
        <h2 className="text-xl mx-4">{t("Part 3")}</h2>
      </div>

      <section className="bg-background w-100 py-10">
        <div
          className="editor"
          style={{
            minHeight: "64px",
            maxWidth: "94%",
            border: "2px solid #0000001A",
            margin: "0 auto",
            backgroundColor: "#0000000D",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {editorControllers.map((btn, index) => (
            <div
              key={index}
              className={`flex items-center md:w-[65px] h-[64px] ${
                activeButton === btn.name
                  ? "bg-green-500 text-white"
                  : "bg-transparent text-black"
              }`}
            >
              <button
                className="m-auto p-2 rounded transition"
                onClick={() => handleButtonClick(btn.name, btn.onClick)}
              >
                {btn.icon}
              </button>
            </div>
          ))}
          <select
            className="bg-transparent py-1 rounded text-xs md:text-sm"
            defaultValue={"Sans Serif"}
          >
            <option value="Sans Serif">Sans Serif</option>
          </select>
        </div>

        <div
          style={{
            maxWidth: "94%",
            height: "307px",
            border: "2px solid #0000001A",
            borderTop: "none",
            margin: "0rem auto",
          }}
        >
          <textarea
            ref={textareaRef}
            style={{
              width: "100%",
              height: "100%",
              outline: "none",
              backgroundColor: "#00000008",
              resize: "none",
              padding: "0.35rem",
            }}
            value={text}
            onChange={handleChange}
            rows={10}
            cols={50}
            placeholder={`${t("Start typing")}...`}
          />
        </div>
      </section>
    </>
  );
}
