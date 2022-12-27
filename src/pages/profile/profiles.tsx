/* pages/profiles/profiles.tsx */

import { useQuery } from '@apollo/client'
import { useAuth } from '../../modules/auth/auth-provider'
import Link from 'next/link'
import { makeProfilePictureUrl } from '../../modules/profile/util'
import { ProfilesDocument } from '../../generated/graphql'

const Profiles = () => {
  const { address } = useAuth()

  const { data, loading, error } = useQuery(ProfilesDocument, {
    variables: { ownedBy: address }
  })

  if (loading) {
    return 'Loading...'
  }

  if (error) {
    return `Error! ${error.message}`
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl mb-6 font-bold">My profiles 🌿</h1>
      {data?.profiles.items.map((profile: any) => (
        <div
          key={profile.id}
          className="max-w-screen-xl shadow-md p-6 rounded-lg mb-8 flex flex-col items-center"
        >
          <img
            className="w-48"
            alt="profile picture"
            src={makeProfilePictureUrl(profile)}
          />
          <p className="text-xl text-center mt-6">{`Name: ${profile.name}`}</p>
          <Link href={`/profile/${profile.handle}`}>
            <p className="text-xl text-center mt-6">{`Handle: ${profile.handle}`}</p>
          </Link>
          <p className="text-xl text-gray-400 text-center mt-6">{`ID: ${profile.id}`}</p>
          {profile.default ? (
            <p className="text-emerald-600 text-center mt-6">Default Profile</p>
          ) : (
            <p className="font-bold uppercase text-rose-900 text-center mt-6">
              Not default
            </p>
          )}
          {/* <p className="text-base text-gray-400  text-center mt-2">{profile.bio}</p> */}
        </div>
      ))}
    </div>
  )
}

export default Profiles
