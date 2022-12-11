/* pages/profile/[handle].tsx */
import { useState } from 'react'
import { useAuth } from '../../modules/auth/auth-provider'
import EditForm from '../../modules/article/components/EditForm'
import { useProfile } from '../../modules/profile/hooks'

const Publish = () => {
  const { profile, publications } = useProfile()
  const { address } = useAuth()
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleEditOrCancel = () => {
    setIsEditing((isEditing) => !isEditing)
  }

  return (
    <div className="pt-20">
      <div className="flex flex-col justify-center items-center">
        <EditForm onCancel={handleEditOrCancel} />
      </div>
    </div>
  )
}

export default Publish
