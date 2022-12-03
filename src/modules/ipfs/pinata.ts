import axios from 'axios'
import { PINATA_JWT } from '../../config'
import { PinataResponse } from './ipfs.type'

export const pinJsonToPinata = async <T>(data: T): Promise<PinataResponse> => {
  const result = await axios({
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PINATA_JWT}`
    },
    data: formatPinataContent(data)
  })

  console.log('upload result ipfs', result)

  return result.data
}

const formatPinataContent = (data: any): string => {
  return JSON.stringify({
    pinataContent: data
  })
}
