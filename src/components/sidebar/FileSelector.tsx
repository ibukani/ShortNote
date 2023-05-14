import { MdOutlineFileOpen } from "react-icons/md";
import { open } from "@tauri-apps/api/dialog";
import { useSetRecoilState } from "recoil";
import { selectFileState } from "../../states/EditorAtoms";

export const FileSelector = () => {
  const setSelectFile = useSetRecoilState(selectFileState);

  const handleClick = () => {
    open().then((files) => {
      if (files != null) {
        setSelectFile(files.toLocaleString());
      }
    });
  };

  return (
    <div className="file-selector">
      <MdOutlineFileOpen
        onClick={handleClick}
        color="#A0A0A0"
        size="40px"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};
