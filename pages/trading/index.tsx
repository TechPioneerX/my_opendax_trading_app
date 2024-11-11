import { isBrowser, useAppSelector, withAuth } from '@openware/opendax-web-sdk'
import { useRouter } from 'next/router'
import { FC, JSX, useEffect } from 'react'

const Trading: FC = (): JSX.Element | null => {
  const currentMarket = useAppSelector((state) => state.markets.currentMarket)
  const router = useRouter()

  useEffect(() => {
    if (isBrowser()) {
      const lastMarket = localStorage.getItem('last_market')
      router.replace(`/trading/${lastMarket}`)
    }
    if (currentMarket) {
      router.replace(`/trading/${currentMarket.id}`)
    }
  }, [currentMarket])

  return <></>
}

export default withAuth(Trading)
