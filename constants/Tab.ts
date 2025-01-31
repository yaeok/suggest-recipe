export const TabType = {
  CONTENTS: 'CONTENTS',
  MATERIAL: 'MATERIAL',
  // DIET: 'DIET',
}

export type TabType = (typeof TabType)[keyof typeof TabType]

const labelMap = new Map<string, string>()
labelMap.set(TabType.MATERIAL, '材料指示モード')
// labelMap.set(TabType.DIET, 'ダイエットモード')
labelMap.set(TabType.CONTENTS, '内容指示モード')

export { labelMap }
