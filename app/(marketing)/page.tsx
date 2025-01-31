'use client'

import { useState } from 'react'

import { TabType } from '@/constants/Tab'
import { Recipe } from '@/domain/Recipe'

import ContentRecipeForm from './_components/Form/ContentRecipeForm'
// import DietRecipeForm from './_components/Form/DietRecipeForm'
import MaterialRecipeForm from './_components/Form/MaterialRecipeForm'
import Header from './_components/Header'
import RecipeList from './_components/List/RecipeList'
import SelectTab from './_components/SelectTab'

const Page = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [selectTab, setSelectTab] = useState<TabType>(TabType.MATERIAL)
  const [loading, setLoading] = useState<boolean>(false)
  if (loading) {
    return (
      <div className='w-full min-h-screen flex justify-center items-center gap-6'>
        <div className='h-14 w-14 animate-spin border-[6px] border-red-400 rounded-full border-t-transparent'></div>
        <p className='text-4xl font-semibold animate-pulse'>生成中</p>
      </div>
    )
  } else {
    return (
      <div className='w-full min-h-screen'>
        <Header />
        <div className='max-w-screen-md mx-auto px-8 py-12 space-y-8'>
          <SelectTab selectTab={selectTab} setSelectTab={setSelectTab} />
          {(() => {
            if (selectTab === TabType.CONTENTS) {
              return (
                <ContentRecipeForm
                  setRecipes={setRecipes}
                  setLoading={setLoading}
                />
              )
            } else if (selectTab === TabType.MATERIAL) {
              return (
                <MaterialRecipeForm
                  setRecipes={setRecipes}
                  setLoading={setLoading}
                />
              )
              // } else if (selectTab === TabType.DIET) {
              //   return (
              //     <DietRecipeForm setRecipes={setRecipes} setLoading={setLoading} />
              //   )
            }
          })()}
          {(() => {
            if (recipes.length > 0) {
              return <RecipeList recipes={recipes} />
            }
          })()}
        </div>
      </div>
    )
  }
}

export default Page
