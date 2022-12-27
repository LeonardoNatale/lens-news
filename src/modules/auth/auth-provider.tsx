import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { ethers } from 'ethers'
import { DefaultProfileInfo, AuthContext } from './type'
import { client } from '../../pages/_app'
import {
  AuthenticateDocument,
  ChallengeDocument,
  DefaultProfileDocument,
  Profile
} from '../../generated/graphql'

const AuthContext = createContext<AuthContext>({
  address: '',
  token: '',
  defaultProfile: undefined,
  connect: () => undefined,
  login: () => undefined
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string>()
  const [token, setToken] = useState()
  const [defaultProfile, setDefaultProfile] = useState<DefaultProfileInfo>({
    id: '',
    name: '',
    img_url: '',
    handle: ''
  })

  useEffect(() => {
    // when the app loads, check to see if the user has already connected their wallet
    checkConnection()
  }, [])

  async function checkConnection() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.listAccounts()
    if (accounts.length) {
      setAddress(accounts[0])
    }
  }

  async function connect() {
    /* this allows the user to connect their wallet */
    const account = await window.ethereum.send('eth_requestAccounts')
    if (account.result.length) {
      setAddress(account.result[0])
    }
  }

  async function login() {
    try {
      /* first request the challenge from the API server */
      const challengeInfo = await client.query({
        query: ChallengeDocument,
        variables: { address }
      })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      /* ask the user to sign a message with the challenge info returned from the server */
      const signature = await signer.signMessage(challengeInfo.data.challenge.text)
      /* authenticate the user */
      const authData = await client.mutate({
        mutation: AuthenticateDocument,
        variables: {
          address,
          signature
        }
      })
      /* if user authentication is successful, you will receive an accessToken and refreshToken */
      setToken(authData.data?.authenticate.accessToken)

      /* Get default profile as well
      / For some reason even the variable name has to be exactly as in the gql query... */
      const ethereumAddress = address
      const defaultProfileData = await client.query({
        query: DefaultProfileDocument,
        variables: { ethereumAddress }
      })

      const defaultProfile = defaultProfileData.data.defaultProfile as unknown as Profile

      /* This seems to work for profiles created on lenster, how can we know which ifps an image is hosted on? */
      const avatar_url =
        'https://lens.infura-ipfs.io/ipfs/' +
        defaultProfile.picture?.original.url.substring(7) // TODO fix in case of NFT image
      setDefaultProfile({
        id: defaultProfile.id,
        name: defaultProfile.name,
        img_url: avatar_url,
        handle: defaultProfile.handle
      })
    } catch (err) {
      console.log('Error signing in: ', err)
    }
  }

  return (
    <AuthContext.Provider value={{ address, token, defaultProfile, connect, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
