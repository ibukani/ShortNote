import { useRef, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { selectFileState } from "../../states/EditorAtoms";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { FaSave } from "react-icons/fa";

export const Editor = () => {
  const [text, setText] = useState("No files selected");
  const [currentSelectFile, setCurrentSelectFile] = useState("");
  const refValue = useRef(text);
  const selectFile = useRecoilValue(selectFileState);

  useEffect(() => {
    if (selectFile != currentSelectFile) {
      setCurrentSelectFile(selectFile);
      const asyncProcess = async () => {
        const context = await readTextFile(selectFile);

        refValue.current = context;
        setText(context);
      };
      asyncProcess();
    }
  });

  const handleInput = (event: React.FormEvent<HTMLElement>) => {
    setText(event.currentTarget.textContent || "");
  };

  // Saveの処理
  const handleClick = () => {
    console.log(text);
    if (selectFile == null) {
      console.log("null file");
      return;
    }

    const asyncProcess = async () => {
      const context = await readTextFile(selectFile);

      // 中身が同じの時は処理を停止
      if (text === context) {
        console.log("Its all the same inside.");
        return;
      }

      writeTextFile(selectFile, text);
      console.log("saveFile!");
    };
    asyncProcess();
  };

  return (
    <div className="editor" style={{ height: "100%", width: "100%" }}>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#EFEFEF",
          borderRadius: "10px",
          boxShadow: "0px 3px 2px #ccc",
        }}
      >
        <FaSave
          size="25"
          color="#4F4F4F"
          style={{ margin: "5px", cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
      <pre
        prefix=" - "
        style={{ height: "100%", width: "100%", cursor: "text" }}
      >
        <code
          contentEditable="true"
          onInput={(event) => {
            handleInput(event);
          }}
          style={{
            outline: "none",
          }}
          dangerouslySetInnerHTML={{ __html: refValue.current }}
        ></code>
      </pre>
    </div>
  );
};
