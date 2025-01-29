import { Nutrition } from '@/domain/Recipe'

export const createPromptByContent = (args: {
  content: string
  serves: number
}): string => {
  const { content, serves } = args

  const prompt = `
      # 命令
      ${content}のレシピを3つ考えてください。
      ${serves}人前の材料と分量をそれぞれ教えてください。
      作り方の工程も教えてください。

      # 制約
      - 工程には番号はつけないでください。
      - 材料と工程は5つ以上にしてください。
      {
        "recipes" : [
          {
            "title": "レシピ1",
            "materials": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "process": [
              "工程1",
              "工程2"
            ],
            "nutrition": {
              "calorie": 100,
              "protein": 10,
              "fat": 5,
              "carbohydrate": 20
              "salt": 1
            }
          },
          {
            "title": "レシピ2",
            "materials": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "process": [
              "工程1",
              "工程2"
            ],
            "nutrition": {
              "calorie": 100,
              "protein": 10,
              "fat": 5,
              "carbohydrate": 20
              "salt": 1
            }
          },
          {
            "title": "レシピ3",
            "materials": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "process": [
              "工程1",
              "工程2"
            ],
            "nutrition": {
              "calorie": 100,
              "protein": 10,
              "fat": 5,
              "carbohydrate": 20
              "salt": 1
            }
          }
        ]
      }
    `

  return prompt
}

export const createPromptByMaterial = (args: {
  materials: string[]
  serves: number
}): string => {
  const { materials, serves } = args

  const prompt = `
      # 命令
      ${materials.join('、')}を使ったレシピを3つ考えてください。
      ${serves}人前の材料と分量をそれぞれ教えてください。
      作り方の工程も教えてください。

      # 制約
      - 工程には番号はつけないでください。
      - 材料と工程は5つ以上にしてください。
      {
        "recipes" : [
          {
            "title": "レシピ1",
            "materials": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "process": [
              "工程1",
              "工程2"
            ],
            "nutrition": {
              "calorie": 100,
              "protein": 10,
              "fat": 5,
              "carbohydrate": 20
              "salt": 1
            }
          },
          {
            "title": "レシピ2",
            "materials": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "process": [
              "工程1",
              "工程2"
            ],
            "nutrition": {
              "calorie": 100,
              "protein": 10,
              "fat": 5,
              "carbohydrate": 20
              "salt": 1
            }
          },
          {
            "title": "レシピ3",
            "materials": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "process": [
              "工程1",
              "工程2"
            ],
            "nutrition": {
              "calorie": 100,
              "protein": 10,
              "fat": 5,
              "carbohydrate": 20
              "salt": 1
            }
          }
        ]
      }
    `

  return prompt
}

export const createPromptByDiet = (args: {
  diets: Nutrition
  serves: number
}): string => {
  const { diets, serves } = args

  const prompt = `
      # 命令
      以下の栄養価を持つレシピを3つ考えてください。
      ${diets.calorie}
      ${diets.protein}
      ${diets.fat}
      ${diets.carbohydrate}
      ${diets.salt}
      
      ${serves}人前の材料と分量をそれぞれ教えてください。
      栄養の量は忠実に守ってください。
      作り方の工程も教えてください。

      # 制約
      - 工程には番号はつけないでください。
      - 材料と工程は5つ以上にしてください。
      {
        "recipes" : [
          {
            "title": "レシピ1",
            "materials": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "process": [
              "工程1",
              "工程2"
            ],
            "nutrition": {
              "calorie": 100,
              "protein": 10,
              "fat": 5,
              "carbohydrate": 20
              "salt": 1
            }
          },
          {
            "title": "レシピ2",
            "materials": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "process": [
              "工程1",
              "工程2"
            ],
            "nutrition": {
              "calorie": 100,
              "protein": 10,
              "fat": 5,
              "carbohydrate": 20
              "salt": 1
            }
          },
          {
            "title": "レシピ3",
            "materials": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "process": [
              "工程1",
              "工程2"
            ],
            "nutrition": {
              "calorie": 100,
              "protein": 10,
              "fat": 5,
              "carbohydrate": 20
              "salt": 1
            }
          }
        ]
      }
    `

  return prompt
}
