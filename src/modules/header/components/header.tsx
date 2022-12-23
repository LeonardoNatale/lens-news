import Link from 'next/link'
import { Newspaper, UserCircle } from 'phosphor-react'
import { useAuth } from '../../auth/auth-provider'

const Header = () => {
  const { address, token, connect, login } = useAuth()

  return (
    <header className="flex w-full fixed bg-white justify-center top-0">
      <div className="flex w-2/3 justify-between items-center">
        <Link href="/" className="flex gap-2 items-center">
          <Newspaper size={60} weight="bold" />
          <h1>Lens News</h1>
        </Link>
        {address && token && (
          <h3>
            <Link href="/article/publish">+ Publish Article</Link>
          </h3>
        )}
        <div className="flex gap-2 items-center">
          {/* if the user has not yet connected their wallet, show a connect button */}
          {!address && <button onClick={connect}>Connect</button>}
          {/* if the user has connected their wallet but has not yet authenticated, show them a login button */}
          {address && !token && <button onClick={login}>Login</button>}
          {/* once the user has authenticated, show them a success message */}
          {address && token && <h3>Logged in</h3>}
          <Link href="/profile/profiles">
            <UserCircle size={60} />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
