/* pages/profile/create.tsx */

import { ChangeEventHandler, FormEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PROFILE } from '../../modules/profile/create-profile'
import { useAuth } from '../../modules/auth/auth-provider'
import { CreateProfileRequest } from '../../modules/profile/profile.type'
import { generateContext } from '../../modules/auth/utils'

const Create = () => {
  const { token } = useAuth()
  const [formData, setFormData] = useState<CreateProfileRequest>()

  const [createProfile, { data, loading, error }] = useMutation(CREATE_PROFILE)

  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    )
  }

  const onChangeHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    } as CreateProfileRequest)
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    console.log(formData)
    try {
      await createProfile({
        variables: {
          request: {
            handle: formData?.handle,
            profilePictureUri: formData?.profilePictureUri
          }
        },
        ...generateContext(token)
      })

      console.log(data)
    } catch (e) {
      console.log(error?.message)
    }
  }

  return (
    <div className="w-60 m-auto flex flex-col justify-center items-center p-6 gap-10 bg-slate-100 rounded-lg">
      <h1>CREATE PROFILE</h1>
      <form
        // action="/api/form"
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

        <label htmlFor="profilePictureUri">Profile picture url</label>
        <input
          className="rounded-sm p-1"
          type="url"
          id="profilePictureUri"
          name="profilePictureUri"
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
