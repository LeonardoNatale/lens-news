import { useMutation } from '@apollo/client'
import React, { ChangeEventHandler, FormEvent, useState } from 'react'
import { useAuth } from '../../auth/auth-provider'
import { generateContext } from '../../auth/utils'
import { pinJsonToPinata } from '../../ipfs/pinata'
import { CREATE_PUBLICATION } from '../metadata/create-publication'
import { makeArticleMetadataRequest } from '../metadata/util'
import { PublicationMetadata } from '../article.type'
import * as _ from 'lodash'

const EditForm = (props: any) => {
  const { token } = useAuth()
  const [formData, setFormData] = useState<any>({ title: '', content: '' })

  const [createPublication, { data, loading, error }] = useMutation(CREATE_PUBLICATION)

  const onChangeHandle: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e
  ) => {
    const { name, value } = e.target

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
      profileId: props.profileId,
      contentURI: `ipfs://${ipfsResult.IpfsHash}`,
      collectModule: {
        revertCollectModule: true
      },
      referenceModule: {
        followerOnlyReferenceModule: false
      }
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
    <div className="w-full max-w-sm bg-slate-100 p-6 rounded-lg">
      <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
        <div>
          <label
            htmlFor="article_title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title:
          </label>
          <input
            type="text"
            id="article_title"
            name="article_title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData?.name}
            onChange={onChangeHandle}
          />
        </div>
        <div>
          <label
            htmlFor="article_content"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Content:
          </label>
          <textarea
            id="article_content"
            name="article_content"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData?.bio}
            onChange={onChangeHandle}
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={props.onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditForm
