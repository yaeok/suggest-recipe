import Link from 'next/link'

export default function Header() {
  return (
    <header className='w-full shadow-md'>
      <div className='max-w-screen-lg mx-auto px-4 py-4 flex justify-between items-center sticky top-0 z-10'>
        <h1 className='text-red-400 text-xl font-semibold'>
          <Link href='/'>レシピジェネレータ</Link>
        </h1>
      </div>
    </header>
  )
}
