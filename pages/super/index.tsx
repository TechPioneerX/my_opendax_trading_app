import { withAdminAuth, withAuth } from '@openware/opendax-web-sdk'
import { useRouter } from 'next/router'
import * as React from 'react'

const Super: React.FC = () => {
  const router = useRouter()

  React.useEffect(() => {
    router.replace('/super/activation')
  }, [])

  return null
}

export default withAuth(withAdminAuth(Super))
