import { withAuth } from '@openware/opendax-web-sdk'
import { useRouter } from 'next/router'
import * as React from 'react'

const Orders: React.FC = () => {
  const router = useRouter()

  React.useEffect(() => {
    router.replace('/orders/all')
  }, [])

  return null
}

export default withAuth(Orders)
