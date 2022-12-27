import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Profile, ProfileDocument, PublicationsDocument } from '../../generated/graphql'
import { client } from '../../pages/_app'

export const useProfile = () => {
  /* create initial state to hold user profile and array of publications */
  const [profile, setProfile] = useState<Profile>()
  const [publications, setPublications] = useState<any[]>([])
  /* using the router we can get the lens handle from the route param */
  const router = useRouter()
  const handle = router.query.handle as string

  const fetchProfile = useCallback(async () => {
    try {
      /* fetch the user profile using their handle */
      const returnedProfile = await client.query({
        query: ProfileDocument,
        variables: { request: { handle } }
      })
      const fetchedProfile = { ...returnedProfile.data.profile } as unknown as Profile
      setProfile(fetchedProfile)

      /* fetch the user's publications from the Lens API and set them in the state */
      const pubs = await client.query({
        query: PublicationsDocument,
        variables: {
          request: {
            profileId: fetchedProfile.id,
            limit: 50
          }
        }
      })
      setPublications(pubs.data.publications.items)
    } catch (err) {
      console.log('error fetching profile...', err)
    }
  }, [handle])

  useEffect(() => {
    if (handle) {
      fetchProfile()
    }
  }, [handle, fetchProfile])

  return { profile, publications }
}
