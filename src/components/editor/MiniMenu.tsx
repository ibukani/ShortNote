import { FaSave } from 'react-icons/fa'
import { useRecoilValue } from 'recoil'
import { selectFileContentState, selectFileState } from '../../states/EditorAtoms'
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs'

export const MiniMenu = () => {
  const currentContent = useRecoilValue(selectFileContentState)
  const selectFile = useRecoilValue(selectFileState)

  const handleClickSaveButton = async () => {
    if (selectFile == null) {
      console.log('null file')
      return
    }

    const context = await readTextFile(selectFile)

    // 中身が同じの時は処理を停止
    if (currentContent === context) {
      console.log('Its all the same inside.')
      return
    }

    console.log(currentContent)
    writeTextFile(selectFile, currentContent)
    console.log('saveFile!')
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#EFEFEF',
        borderRadius: '10px',
        boxShadow: '0px 3px 2px #ccc',
      }}
    >
      <FaSave size='25' color='#4F4F4F' style={{ margin: '5px', cursor: 'pointer' }} onClick={handleClickSaveButton} />
    </div>
  )
}
