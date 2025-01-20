import { labelMap } from '@/constants/Tab'

type SelectTabProps = {
  selectTab: string
  setSelectTab: (selectTab: string) => void
}

const SelectTab = ({ selectTab, setSelectTab }: SelectTabProps) => {
  return (
    <div className='w-full p-2 bg-gray-100 rounded-lg flex flex-row gap-2'>
      {Array.from(labelMap.entries()).map(([key, value]) => {
        return (
          <button
            key={key}
            className={`flex-1 p-2 rounded-md ${
              key === selectTab
                ? 'bg-red-400 font-semibold text-white'
                : 'bg-white font-medium text-black'
            }`}
            onClick={() => setSelectTab(key)}
          >
            {value}
          </button>
        )
      })}
    </div>
  )
}

export default SelectTab
