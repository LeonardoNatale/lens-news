import Link from 'next/link'
import { Newspaper, UserCircle, DotsThreeVertical } from 'phosphor-react'
import { useAuth } from '../../auth/auth-provider'

const Header = () => {
  const { address, token, defaultProfile, connect, login } = useAuth()

  return (
    <header className="flex w-full fixed bg-white justify-center top-0">
      <div className="flex w-2/3 justify-between items-center">
        <Link href="/" className="flex gap-2 items-center">
          <Newspaper size={60} weight="bold" />
          <h1>Lens News</h1>
        </Link>
        <div className="flex gap-2 items-center">
          {/* if the user has not yet connected their wallet, show a connect button */}
          {!address && <button onClick={connect}>Connect</button>}
          {/* if the user has connected their wallet but has not yet authenticated, show them a login button */}
          {address && !token && <button onClick={login}>Login</button>}
          {/* once the user has authenticated, show them a success message */}
          {!token && (
            <Link href="/profile/profiles">
              <UserCircle size={60} />
            </Link>
          )}
          {address && token && (
            <div className="flex flex-row gap-4">
              <b>Logged in as {defaultProfile.name}</b>
              <Link href="/profile/profiles">
                <img
                  alt="avatar"
                  src={defaultProfile.img_url}
                  className="h-10 mx-auto object-cover rounded-full w-10"
                />
              </Link>
              <Link href="/article/publish">
                <DotsThreeVertical size={32} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
