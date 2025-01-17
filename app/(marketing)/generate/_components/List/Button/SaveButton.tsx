import { useState } from 'react'

import { Recipe } from '@/domain/Recipe'
import { RecipeRepository } from '@/infrastracture/repository/recipe_repository'

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
      setIsSaving(false)
    }
  }
  return (
    <button
      type='button'
      onClick={handleSave}
      disabled={isSaving}
      className='px-4 py-2 text-lg font-semibold bg-green-400 rounded-full disabled:opacity-50'
    >
      登録する
    </button>
  )
}

export default SaveButton
