/* pages/profile/create.tsx */

import { ChangeEventHandler, FormEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PROFILE } from '../../modules/profile/create-profile'
import { CreateProfileRequest } from './type'
import { useAuth } from '../../modules/auth/auth-provider'

const Create = () => {
  const { token } = useAuth()
  const [formData, setFormData] = useState<CreateProfileRequest>()

  const [createProfile, { data, loading, error }] = useMutation(CREATE_PROFILE)

  const onChangeHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    } as CreateProfileRequest)
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await createProfile({
        variables: {
          request: {
            handle: formData?.handle,
            profilePictureUri: formData?.profilePictureUri
          }
        },
        context: {
          headers: {
            'x-access-token': token
          }
        }
      })

      console.log(data)
    } catch (e) {
      console.log(error?.message)
    }
  }

  return (
    <div className="w-60 m-auto flex flex-col justify-center items-center p-4 gap-10 bg-green-400 rounded-lg">
      <h1>CREATE PROFILE</h1>
      <form
        action="/api/form"
        onSubmit={onSubmitHandler}
        className=" flex flex-col gap-2"
      >
        <label htmlFor="handle">Handle</label>
        <input
          className="rounded-sm p-1"
          type="text"
          id="handle"
          name="handle"
          required
          value={formData?.handle}
          onChange={onChangeHandle}
        />

        <label htmlFor="picture">Profile picture url</label>
        <input
          className="rounded-sm p-1"
          type="url"
          id="picture"
          name="picture"
          required
          value={formData?.profilePictureUri}
          onChange={onChangeHandle}
        />
        {/* Add free follow module params and followNFT uri */}
        <button className="border-2 rounded-lg border-black" type="submit">
          Submit
        </button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  )
}

export default Create
