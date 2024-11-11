import {
  NavTabs,
  Tab,
  appTitle,
  useSetMobileDevice,
  withAuth,
} from '@openware/opendax-web-sdk'
import classnames from 'classnames'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import router from 'next/router'
import React, { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'

const TradeHistory = dynamic(
  () =>
    import('@openware/opendax-web-sdk').then((mod: any) => mod.TradeHistory),
  {
    ssr: false,
  },
)

const TradeHistoryList: React.FC = () => {
  const intl = useIntl()
  const isMobile = useSetMobileDevice()

  const wrapperClassName = classnames('flex flex-col w-full pb-16', {
    'h-screen p-6': !isMobile,
    'h-full': isMobile,
  })

  const translate = useCallback(
    (id: string, value?: any) => intl.formatMessage({ id }, { ...value }),
    [],
  )

  const navigationTabsArray = useMemo(() => {
    return [
      {
        name: 'deposits',
        label: translate('page.body.history.tab.deposit'),
        isCurrentTab: false,
      },
      {
        name: 'withdrawals',
        label: translate('page.body.history.tab.withdraw'),
        isCurrentTab: false,
      },
      {
        name: 'trade',
        label: translate('page.body.history.tab.tradehistory'),
        isCurrentTab: true,
      },
    ]
  }, [])

  const onClick = useCallback(
    (route: string) => {
      const navigation =
        navigationTabsArray.find(
          (n) =>
            (isMobile ? n.label : n.name).toLowerCase() === route.toLowerCase(),
        ) || navigationTabsArray[0]
      router.push(`/history/${navigation.name}`)
    },
    [navigationTabsArray, isMobile],
  )

  const renderNavigationTabs = useMemo(() => {
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

  const renderMobileNavigationTabs = React.useMemo(() => {
    return (
      <div className="w-full min-w-max p-5 border-b bg-navbar-background-color sticky top-0 z-10">
        <Tab
          tabsContent={[
            translate('page.body.history.tab.deposit'),
            translate('page.body.history.tab.withdraw'),
            translate('page.body.history.tab.tradehistory'),
          ]}
          selectedContent={translate('page.body.history.tab.tradehistory')}
          mainClassName="relative z-0 inline-flex rounded-md shadow-xs -space-x-px w-full h-9"
          basicClassName="bg-navbar-background-color border-neutral-control-color-70 text-neutral-control-layer-color-40 hover:bg-gray-50 relative inline-flex items-center justify-content px-4 py-1 border text-sm font-medium leading-4 w-full justify-center"
          selectedClassName="z-10 bg-primary-cta-color-10 text-primary-cta-color-90 relative inline-flex items-center justify-content px-4 py-1 text-sm leading-4 font-medium w-full justify-center"
          onClick={onClick}
        />
      </div>
    )
  }, [navigationTabsArray, isMobile])

  return (
    <>
      <Head>
        <title>
          {appTitle(translate('page.body.history.tab.tradehistory'))}
        </title>
      </Head>
      <div className="flex flex-col h-full w-full">
        <div className={wrapperClassName}>
          {!isMobile ? renderNavigationTabs : renderMobileNavigationTabs}
          <TradeHistory />
        </div>
      </div>
    </>
  )
}

export default withAuth(TradeHistoryList)
