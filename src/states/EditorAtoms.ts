import { atom } from "recoil";

export const selectFileState = atom<string>({
  key: "selectFileState",
  default: "",
});
