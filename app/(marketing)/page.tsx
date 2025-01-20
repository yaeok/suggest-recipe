'use client'

import { useState } from 'react'

import { TabType } from '@/constants/Tab'
import { Recipe } from '@/domain/Recipe'

import ContentRecipeForm from './_components/Form/ContentRecipeForm'
import IngredientRecipeForm from './_components/Form/IngredientRecipeForm'
import RecipeList from './_components/List/RecipeList'
import SelectTab from './_components/SelectTab'

const Page = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [selectTab, setSelectTab] = useState<TabType>(TabType.CONTENTS)
  const [loading, setLoading] = useState<boolean>(false)
  if (loading) {
    return (
      <div className='w-full min-h-screen flex justify-center items-center animate-pulse'>
        <div className='w-full flex flex-col items-center gap-4'>
          <h2 className='text-3xl font-extrabold'>生成中...</h2>
        </div>
      </div>
    )
  } else {
    return (
      <div className='w-full min-h-screen max-w-screen-md mx-auto py-24 space-y-8'>
        <SelectTab selectTab={selectTab} setSelectTab={setSelectTab} />
        {(() => {
          if (selectTab === TabType.CONTENTS) {
            return (
              <ContentRecipeForm
                setRecipes={setRecipes}
                setLoading={setLoading}
              />
            )
          } else if (selectTab === TabType.INGREDIENTS) {
            return (
              <IngredientRecipeForm
                setRecipes={setRecipes}
                setLoading={setLoading}
              />
            )
          }
        })()}
        {(() => {
          if (recipes.length > 0) {
            return <RecipeList recipes={recipes} />
          }
        })()}
      </div>
    )
  }
}

export default Page
