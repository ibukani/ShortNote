import { atom } from 'recoil'

export const selectFileState = atom<string>({
  key: 'selectFileState',
  default: '',
})

export const selectFileContentState = atom<string>({
  key: 'selectFileContentState',
  default: '',
})
