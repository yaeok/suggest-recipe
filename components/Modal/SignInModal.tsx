import Link from 'next/link'
import { IconContext } from 'react-icons'
import { RiCloseCircleFill } from 'react-icons/ri'

type SignInModalProps = {
  isOpen: boolean
  onClose: () => void
}

const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
  if (isOpen) {
    return (
      <div className='fixed inset-0 max-h-screen z-50'>
        <div className='fixed inset-0 bg-black opacity-50 filter grayscale' />
        <div className='h-screen flex items-center justify-center'>
          <div className='relative p-4 mx-2 bg-white flex flex-col gap-4 rounded-lg shadow-lg w-full md:w-2/5'>
            <div className='w-full flex flex-row justify-between items-center'>
              <h1 className='text-xl font-semibold text-red-500 border-b-2 border-red-500'>
                注意
              </h1>
              <button onClick={onClose}>
                <IconContext.Provider value={{ size: '2em', color: 'black' }}>
                  <RiCloseCircleFill />
                </IconContext.Provider>
              </button>
            </div>
            <div className='p-4 flex flex-col items-center gap-8'>
              <p className='text-lg'>
                レシピを登録するには、ログインする必要があります
              </p>
              <Link
                href='/sign_in'
                className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-full
                  hover:shadow-none hover:bg-blue-600 hover:translate-y-1 duration-300'
              >
                ログイン
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default SignInModal
