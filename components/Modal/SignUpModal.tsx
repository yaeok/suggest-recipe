import Link from 'next/link'
import { IconContext } from 'react-icons'
import { RiCloseCircleFill } from 'react-icons/ri'

type SignUpModalProps = {
  isOpen: boolean
  onClose: () => void
  isAuth: boolean
  isEmailVerification: boolean
}

const SignUpModal = ({
  isOpen,
  onClose,
  isAuth,
  isEmailVerification,
}: SignUpModalProps) => {
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
            {isAuth && !isEmailVerification && (
              <div className='p-4 flex flex-col items-center gap-8'>
                <div className='flex flex-col items-center'>
                  <p className='text-lg'>メールアドレスの確認が必要です</p>
                  <p className='text-lg'>メールを確認してください</p>
                </div>
                <Link
                  href='/email_verify'
                  className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-full
                  hover:shadow-none hover:bg-blue-600 hover:translate-y-1 duration-300'
                >
                  メール確認
                </Link>
              </div>
            )}
            {!isAuth && (
              <div className='p-4 flex flex-col items-center gap-8'>
                <p className='text-lg'>
                  レシピ生成を実行するには、アカウントを作成してください
                </p>
                <Link
                  href='/sign_up'
                  className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-full
                  hover:shadow-none hover:bg-blue-600 hover:translate-y-1 duration-300'
                >
                  アカウント新規登録
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default SignUpModal
