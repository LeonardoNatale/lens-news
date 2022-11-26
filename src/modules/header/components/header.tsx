import Link from 'next/link'
import { Newspaper, UserCircle } from 'phosphor-react'

const Header = () => {
  return (
    <header className="flex w-full fixed bg-white p-4 justify-center">
      <div className="flex w-2/3 justify-between ">
        <Link href="/" className="flex gap-2 items-center">
          <Newspaper size={60} weight="bold" />
          <h1>Lens News</h1>
        </Link>
        <div className="flex gap-2 items-center">
          <h1>Connect</h1>
          <UserCircle size={60} />
        </div>
      </div>
    </header>
  )
}

export default Header
