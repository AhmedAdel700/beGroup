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
  // Ref to keep the history stack for undo/redo
  const history = useRef<string[]>([text]);
  const historyIndex = useRef<number>(0);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  // Handle text changes
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);

    // If we are in the middle of the history stack, discard future history
    history.current = history.current.slice(0, historyIndex.current + 1);
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

  const applyFormatting = (list: string) => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;
    if (selectionStart === selectionEnd) return; // No text selected

    const selectedText = value.substring(selectionStart, selectionEnd);
    let formattedText = selectedText;

    if (list) {
      const lines = selectedText
        .split("\n")
        .map((line, index) => `${index + 1}. ${line}`);
      formattedText = lines.join("\n");
    }

    const newText =
      value.substring(0, selectionStart) +
      formattedText +
      value.substring(selectionEnd);

    setText(newText);
  };

  const handleButtonClick = (iconName: string, action: () => void) => {
    setActiveButton(activeButton === iconName ? null : iconName);
    action();
  };

  const editorControllers = [
    {
      icon: numberedList,
      name: "numberedList",
      onClick: () => applyFormatting("list"),
    },
    { icon: listBullet, name: "listBullet", onClick: () => {} },
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
            display: "flex", // Flex container for horizontal layout
            alignItems: "center", // Align icons vertically
            justifyContent: "space-evenly", // Space the icons evenly
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
              }`} // Space the icons and separator
            >
              <button
                className={`m-auto p-2 rounded transition`}
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
