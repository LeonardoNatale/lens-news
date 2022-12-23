import { useMutation } from '@apollo/client'
import React, { ChangeEventHandler, FormEvent, useState } from 'react'
import { useAuth } from '../../auth/auth-provider'
import { generateContext } from '../../auth/utils'
import { pinJsonToPinata } from '../../ipfs/pinata'
import { CREATE_PUBLICATION } from '../metadata/create-publication'
import { makeArticleMetadataRequest } from '../metadata/util'
import { PublicationMetadata } from '../article.type'
import * as _ from 'lodash'
import FormButton, { FormButtonColors } from '../../../common/components/FormButton'

const EditForm = (props: any) => {
  const { token } = useAuth()
  const [formData, setFormData] = useState<any>({ name: '', content: '' })

  const [createPublication, { data, loading, error }] = useMutation(CREATE_PUBLICATION)
  const onChangeHandle: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e
  ) => {
    const { name, value } = e.target
    props.onArticleModify(name, value)
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()

    const publicationMetadata = makeArticleMetadataRequest(formData)

    const ipfsResult = await pinJsonToPinata<PublicationMetadata>(publicationMetadata)

    const createPublicationRequest = {
      profileId: '0x5a58', //props.profileId,
      contentURI: `ipfs://${ipfsResult.IpfsHash}`,
      collectModule: { freeCollectModule: { followerOnly: false } },
      referenceModule: { followerOnlyReferenceModule: false }
    }

    // the result goes into the variable "data"
    await createPublication({
      variables: {
        request: createPublicationRequest
      },
      ...generateContext(token)
    })
  }

  return (
    <div className="flex flex-col bg-slate-100 p-6 rounded-lg flex-1">
      <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData?.name}
            onChange={onChangeHandle}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            className="shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-screen"
            value={formData?.bio}
            onChange={onChangeHandle}
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <FormButton text="Cancel" backgroundColor={FormButtonColors.RED} />
          <FormButton text="Save" backgroundColor={FormButtonColors.GREEN} />
        </div>
      </form>
    </div>
  )
}

export default EditForm
