import SaveButton from '../Button/SaveButton'
import { useState } from 'react'
import { useAuthContext } from '@/providers/CurrentUserProvider'
import { Recipe } from '@/domain/Recipe'
import { CreateRecipeUseCase } from '@/usecase/CreateRecipeUseCase/CreateRecipeUseCase'
import SignInModal from '@/components/Modal/SignInModal'

type AuthCheckModalProps = {
  recipe: Recipe
}

const AuthCheckModal = ({ recipe }: AuthCheckModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const currentUser = useAuthContext()

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleSave = async () => {
    if (currentUser.currentUser === null || !currentUser.isEmailVerified) {
      openModal()
      return
    }

    setIsSaving(true)

    try {
      const usecase = new CreateRecipeUseCase()

      const response = await usecase.execute({ recipe })

      if (response.recipe) {
        alert('レシピを登録しました')
      }

      setIsSaving(true)
    } catch (error: any) {
      console.error(error)
      setIsSaving(false)
    }
  }
  return (
    <div>
      <SaveButton onSave={handleSave} isSaving={isSaving} />
      <SignInModal isOpen={isOpen} onClose={closeModal} />
    </div>
  )
}

export default AuthCheckModal
