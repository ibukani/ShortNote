import { RecoilRoot } from "recoil";
import { Editor } from "./components/editor/Editor";
import { FileSelector } from "./components/sidebar/FileSelector";

export const App = () => {
  return (
    <div className="note" style={{ display: "flex" }}>
      <RecoilRoot>
        <div
          className="sidebar"
          style={{ height: "100vh", background: "#F2F2F2" }}
        >
          <FileSelector />
        </div>
        <div className="editor" style={{ width: "100%", height: "100vh" }}>
          <Editor />
        </div>
      </RecoilRoot>
    </div>
  );
};
