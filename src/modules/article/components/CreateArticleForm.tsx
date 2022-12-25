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
import { useRouter } from 'next/router'

const CreateArticleForm = (props: any) => {
  const { defaultProfile, token } = useAuth()
  const router = useRouter()
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
      profileId: defaultProfile.id, //props.profileId,
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
    /* Redirect user to their profile page (it is quite tricky to get the
      actual article ID, but would be nicer to redirect there I guess) */
    router.push('/profile/' + defaultProfile.handle)
  }

  if (loading) {
    return <p>Publishing...</p>
  }

  return (
    <div className="flex flex-col bg-slate-100 p-6 rounded-lg flex-1">
      <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
        <FormInput
          type="text"
          label="Title:"
          name="name"
          value={formData?.name}
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
