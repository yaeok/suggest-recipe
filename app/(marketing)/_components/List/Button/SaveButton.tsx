import { useState } from 'react'

import { Recipe } from '@/domain/Recipe'
import { RecipeRepository } from '@/infrastracture/repository/impl_recipe_repository'

type SaveButtonProps = {
  recipe: Recipe
}

const SaveButton = ({ recipe }: SaveButtonProps) => {
  const [isSaving, setIsSaving] = useState(false)
  const handleSave = async () => {
    setIsSaving(true)

    try {
      const repository = new RecipeRepository()

      await repository.create({ recipe })

      setIsSaving(true)
    } catch (error) {
      console.error(error)
      setIsSaving(false)
    }
  }
  return (
    <button
      type='button'
      onClick={handleSave}
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
