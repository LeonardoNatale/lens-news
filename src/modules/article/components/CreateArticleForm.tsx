import { useMutation } from '@apollo/client'
import React, { ChangeEventHandler, FormEvent, useState } from 'react'
import { useAuth } from '../../auth/auth-provider'
import { generateContext } from '../../auth/utils'
import { pinJsonToPinata } from '../../ipfs/pinata'
import { CREATE_PUBLICATION } from '../metadata/create-publication'
import { makeArticleMetadataRequest } from '../metadata/util'
import { PublicationMetadata } from '../article.type'
import FormButton, { FormButtonColors } from '../../../common/components/FormButton'
import FormInput from '../../../common/components/FormInput'
import FormTextArea from '../../../common/components/FormTextArea'

const CreateArticleForm = (props: any) => {
  const { token } = useAuth()
  const [formData, setFormData] = useState<any>({ title: '', content: '' })

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
        <FormInput
          type="text"
          label="Title:"
          name="title"
          value={formData?.title}
          onChange={onChangeHandle}
        />
        <FormTextArea
          label="Content:"
          name="content"
          value={formData?.content}
          onChange={onChangeHandle}
        />
        <div className="flex justify-center">
          <FormButton text="Save" backgroundColor={FormButtonColors.GREEN} />
        </div>
      </form>
    </div>
  )
}

export default CreateArticleForm
