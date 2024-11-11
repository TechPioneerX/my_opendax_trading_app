import {
  NavTabs,
  appTitle,
  useSetMobileDevice,
  withAuth,
} from '@openware/opendax-web-sdk'
import classnames from 'classnames'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import router from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'

const OrdersOpen = dynamic(
  () => import('@openware/opendax-web-sdk').then((mod: any) => mod.OrdersOpen),
  {
    ssr: false,
  },
)

const OrdersOpenHistory: React.FC = () => {
  const intl = useIntl()
  const isMobile = useSetMobileDevice()

  const wrapperClassName = classnames('flex flex-col w-full pb-16', {
    'h-screen p-6': !isMobile,
    'h-full': isMobile,
  })

  const translate = React.useCallback(
    (id: string) => intl.formatMessage({ id }),
    [],
  )

  const navigationTabsArray = React.useMemo(() => {
    return [
      {
        name: 'all',
        label: translate('page.body.openOrders.tab.all'),
        isCurrentTab: false,
      },
      {
        name: 'open',
        label: translate('page.body.openOrders.tab.open'),
        isCurrentTab: true,
      },
    ]
  }, [])

  const onClick = React.useCallback(
    (route: string) => {
      const navigation =
        navigationTabsArray.find(
          (n) => n.name.toLowerCase() === route.toLowerCase(),
        ) || navigationTabsArray[0]
      router.push(`/orders/${navigation.name}`)
    },
    [navigationTabsArray],
  )

  const renderNavigationTabs = React.useMemo(() => {
    return (
      <div className="w-full min-w-max pb-3">
        <NavTabs
          tabs={navigationTabsArray}
          onClick={onClick}
          activeTabClassName={
            'bg-primary-cta-color-10 text-primary-cta-color-90'
          }
          defaultTabClassName={
            'bg-body-background-color duration-200 text-neutral-control-layer-color-60 hover:bg-neutral-control-color-20'
          }
        />
      </div>
    )
  }, [navigationTabsArray])

  return (
    <>
      <Head>
        <title>{appTitle(translate('page.tab.header.openOrders'))}</title>
      </Head>
      <div className="flex flex-col h-full w-full">
        <div className={wrapperClassName}>
          {!isMobile && renderNavigationTabs}
          <OrdersOpen />
        </div>
      </div>
    </>
  )
}

export default withAuth(OrdersOpenHistory)
