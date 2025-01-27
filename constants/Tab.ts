export const TabType = {
  CONTENTS: 'CONTENTS',
  INGREDIENTS: 'INGREDIENTS',
  DIET: 'DIET',
}

export type TabType = (typeof TabType)[keyof typeof TabType]

const labelMap = new Map<string, string>()
labelMap.set(TabType.INGREDIENTS, '材料指示モード')
labelMap.set(TabType.DIET, 'ダイエットモード')
labelMap.set(TabType.CONTENTS, '内容指示モード')

export { labelMap }
