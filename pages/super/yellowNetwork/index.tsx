import { withAdminAuth, withAuth } from '@openware/opendax-web-sdk'
import { useRouter } from 'next/router'
import * as React from 'react'

const YellowNetwork: React.FC = () => {
  const router = useRouter()

  React.useEffect(() => {
    router.replace('/super/yellowNetwork/brokers')
  }, [])

  return null
}

export default withAuth(withAdminAuth(YellowNetwork))
