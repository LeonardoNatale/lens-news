import Link from 'next/link'
import { Newspaper, UserCircle, DotsThreeVertical } from 'phosphor-react'
import { useAuth } from '../../auth/auth-provider'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
  const { address, token, defaultProfile, login } = useAuth()

  return (
    <header className="w-full sticky bg-white justify-center top-0 border-b">
      <div className="container px-5 mx-auto max-w-screen-xl">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex gap-2 items-center">
            <Newspaper size={40} weight="bold" />
            <h2>Lens News</h2>
          </Link>
          <div className="flex gap-2 items-center">
            {/* if the user has connected their wallet but has not yet authenticated, show them a login button */}
            {address && !token && <button onClick={login}>Login</button>}
            {/* once the user has authenticated, show them a success message */}
            {!token && (
              <Link href="/profile/profiles">
                <UserCircle size={40} />
              </Link>
            )}
            {address && token && (
              <div className="flex flex-row gap-4 items-center">
                <b>Logged in as {defaultProfile.name}</b>
                <Link href="/profile/profiles">
                  <img
                    alt="avatar"
                    src={defaultProfile.imgUrl}
                    className="h-10 mx-auto object-cover rounded-full w-10"
                  />
                </Link>
                <Link href="/article/publish">
                  <DotsThreeVertical size={32} />
                </Link>
              </div>
            )}
            <ConnectButton chainStatus="none" showBalance={false} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
