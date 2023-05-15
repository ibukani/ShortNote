import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectFileContentState, selectFileState } from '../../states/EditorAtoms'
import { readTextFile } from '@tauri-apps/api/fs'

export const TextField = () => {
  const [text, setText] = useRecoilState(selectFileContentState)
  // ファイル関連
  const [currentSelectFile, setCurrentSelectFile] = useState<string>()
  const selectFile = useRecoilValue(selectFileState)

  if (selectFile != currentSelectFile) {
    setCurrentSelectFile(selectFile)
    const asyncProcess = async () => {
      const context = await readTextFile(selectFile)

      setText(context)
    }
    asyncProcess()
  }

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  return (
    <div className='editor-textfield' style={{ height: '100%', width: '100%' }}>
      <textarea
        onChange={handleInput}
        value={text}
        style={{ display: 'block', width: '100%', height: '100%', resize: 'none', outline: 'none' }}
      />
    </div>
  )
}
