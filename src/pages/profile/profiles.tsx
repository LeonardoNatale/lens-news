/* pages/profiles/create.tsx */

import { PROFILES } from '../../modules/profile/get-profiles'
import { useQuery } from '@apollo/client'
import { useAuth } from '../../modules/auth/auth-provider'

const Create = () => {
  const { address } = useAuth()

  const { data, loading, error } = useQuery(PROFILES, { variables: { ownedBy: address } })

  if (loading) {
    return 'Loading...'
  }

  if (error) {
    return `Error! ${error.message}`
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl mb-6 font-bold">My profiles 🌿</h1>
      {data.profiles.items.map((profile) => (
        <div
          key={profile.id}
          className="w-2/3 shadow-md p-6 rounded-lg mb-8 flex flex-col items-center"
        >
          {/* <img
            className="w-48"
            src={profile.picture.uri || 'https://picsum.photos/200'}
          /> */}
          <p className="text-xl text-center mt-6">{profile.id}</p>
          <p className="text-xl text-center mt-6">{profile.handle}</p>
          {/* <p className="text-base text-gray-400  text-center mt-2">{profile.bio}</p> */}
        </div>
      ))}
    </div>
  )
}

export default Create
