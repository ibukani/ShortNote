import { TextField } from './TextField'
import { MiniMenu } from './MiniMenu'

export const Editor = () => {
  return (
    <div className='editor' style={{ height: '100%', width: '100%' }}>
      <MiniMenu />
      <TextField />
    </div>
  )
}
