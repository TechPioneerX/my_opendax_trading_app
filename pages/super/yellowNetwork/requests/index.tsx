import { withAdminAuth, withAuth } from '@openware/opendax-web-sdk'
import { useRouter } from 'next/router'
import * as React from 'react'

const Requests: React.FC = () => {
  const router = useRouter()

  React.useEffect(() => {
    router.replace('/super/yellowNetwork/requests/incoming')
  }, [])

  return null
}

export default withAuth(withAdminAuth(Requests))
