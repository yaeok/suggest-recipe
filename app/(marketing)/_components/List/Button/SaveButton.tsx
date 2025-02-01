type SaveButtonProps = {
  onSave: () => void
  isSaving: boolean
}

const SaveButton = ({ onSave, isSaving }: SaveButtonProps) => {
  return (
    <button
      type='button'
      onClick={onSave}
      disabled={isSaving}
      className='px-4 py-2 bg-green-400 rounded-full shadow-md 
      disabled:opacity-50 disabled:cursor-not-allowed
      hover:shadow-none hover:bg-green-500 hover:translate-y-1 duration-300'
    >
      登録する
    </button>
  )
}

export default SaveButton
