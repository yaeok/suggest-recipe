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
            "ingredients": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "procedure": [
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
            "ingredients": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "procedure": [
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
            "ingredients": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "procedure": [
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

export const createPromptByIngredients = (args: {
  ingredients: string[]
  serves: number
}): string => {
  const { ingredients, serves } = args

  const prompt = `
      # 命令
      ${ingredients.join('、')}を使ったレシピを3つ考えてください。
      ${serves}人前の材料と分量をそれぞれ教えてください。
      作り方の工程も教えてください。

      # 制約
      - 工程には番号はつけないでください。
      - 材料と工程は5つ以上にしてください。
      {
        "recipes" : [
          {
            "title": "レシピ1",
            "ingredients": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "procedure": [
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
            "ingredients": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "procedure": [
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
            "ingredients": [
              {
                "name": "材料1",
                "quantity": "分量1"
              },
              {
                "name": "材料2",
                "quantity": "分量2"
              }
            ],
            "procedure": [
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
