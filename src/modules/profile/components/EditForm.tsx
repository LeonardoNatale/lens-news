import { useMutation } from '@apollo/client'
import { ethers, utils } from 'ethers'
import React, { ChangeEventHandler, FormEvent, useState } from 'react'
import { useAuth } from '../../auth/auth-provider'
import { generateContext } from '../../auth/utils'
import { pinJsonToPinata } from '../../ipfs/pinata'
import { CREATE_SET_PROFILE_METADATA } from '../metadata/create-set-profile-metadata'
import { makeProfileMetadataRequest } from '../metadata/util'
import { ProfileMetadata } from '../profile.type'
import * as _ from 'lodash'

import LensPeripheryABI from '../../../abis/lens-periphery-data-provider.json'
import { LENS_PERIPHERY_CONTRACT } from '../../../common/config'
import FormInput from '../../../common/components/FormInput'
import FormTextArea from '../../../common/components/FormTextArea'

const EditForm = (props: any) => {
  const { token } = useAuth()
  const [formData, setFormData] = useState<any>({ name: '', bio: '', cover_picture: '' })

  const [createSetProfileMetadata, { data, loading, error }] = useMutation(
    CREATE_SET_PROFILE_METADATA
  )

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

    const profileMetadataRequest = makeProfileMetadataRequest(formData)
    // console.log(profileMetadataRequest)

    const ipfsResult = await pinJsonToPinata<ProfileMetadata>(profileMetadataRequest)

    const createProfileMetadataRequest = {
      profileId: props.profileId,
      metadata: `ipfs://${ipfsResult.IpfsHash}`
    }

    // the result goes into the variable "data"
    await createSetProfileMetadata({
      variables: {
        request: createProfileMetadataRequest
      },
      ...generateContext(token)
    })

    console.log('data', data)

    const typedData = data.createSetProfileMetadataTypedData.typedData
    console.log('create profile metadata: typedData', typedData)

    const { domain, types, value } = typedData
    console.log(typedData)

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const signature = await signer._signTypedData(
      _.omit(domain, ['__typename']),
      _.omit(types, ['__typename']),
      _.omit(value, ['__typename'])
    )
    console.log('create profile metadata: signature', signature)

    const { v, r, s } = utils.splitSignature(signature)
    const LensPeripheryContract = new ethers.Contract(
      LENS_PERIPHERY_CONTRACT as string,
      LensPeripheryABI,
      signer
    )

    console.log('METAAAA', [props.profileId, createProfileMetadataRequest.metadata])

    const tx = await LensPeripheryContract.setProfileMetadataURIWithSig({
      profileId: props.profileId,
      metadata: createProfileMetadataRequest.metadata,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline
      }
    })

    console.log('create profile metadata: tx hash', tx.hash)
  }

  return (
    <div className="w-full max-w-sm bg-slate-100 p-6 rounded-lg">
      <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
        <FormInput
          type="text"
          label="Name"
          name="name"
          value={formData?.name}
          onChange={onChangeHandle}
        />
        <FormTextArea
          label="Bio:"
          name="bio"
          value={formData?.bio}
          onChange={onChangeHandle}
        />
        <FormInput
          type="url"
          label="Cover Picture URL:"
          name="cover_picture"
          value={formData?.profilePictureUri}
          onChange={onChangeHandle}
        />

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
