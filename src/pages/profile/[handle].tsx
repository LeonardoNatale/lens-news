/* pages/profile/[handle].tsx */
import { useProfile } from '../../modules/profile/hooks'

const Profile = () => {
  const { profile, publications } = useProfile()

  if (!profile) {
    return null
  }

  return (
    <div className="pt-20">
      <div className="flex flex-col justify-center items-center">
        <img
          className="w-64 rounded-full"
          alt="profile picture"
          src={profile.avatarUrl}
        />
        <p className="text-4xl mt-8 mb-8">{profile.handle}</p>
        <p className="text-center text-xl font-bold mt-2 mb-2 w-1/2">{profile.bio}</p>
        {publications.map((pub) => (
          <div key={pub.id} className="shadow p-10 rounded mb-8 w-2/3">
            <p>{pub.metadata.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
