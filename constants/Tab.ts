export const TabType = {
  CONTENTS: 'CONTENTS',
  INGREDIENTS: 'INGREDIENTS',
}

export type TabType = (typeof TabType)[keyof typeof TabType]

const labelMap = new Map<string, string>()
labelMap.set(TabType.CONTENTS, '内容を指示する')
labelMap.set(TabType.INGREDIENTS, '材料を指示する')

export { labelMap }
