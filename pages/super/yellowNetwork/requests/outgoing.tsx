import {
  Breadcrumb,
  NavTabs,
  appTitle,
  useSetMobileDevice,
  withAdminAuth,
  withAuth,
} from '@openware/opendax-web-sdk'
import classnames from 'classnames'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import router from 'next/router'
import * as React from 'react'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'

const OutgoingRequests = dynamic(
  () =>
    import('@openware/opendax-web-sdk').then(
      (mod: any) => mod.OutgoingRequests,
    ),
  {
    ssr: false,
  },
)

const OutGoing: React.FC = () => {
  const intl = useIntl()
  const isMobile = useSetMobileDevice()

  const wrapperClassName = classnames(
    'flex flex-col w-full pb-16 drop-shadow-md',
    {
      'h-screen p-6': !isMobile,
      'h-full': isMobile,
    },
  )

  const translate = useCallback(
    (id: string, value?: any) => intl.formatMessage({ id }, { ...value }),
    [],
  )

  const navigationTabsArray = useMemo(() => {
    return [
      {
        name: 'incoming',
        label: translate('page.body.requests.tab.incoming'),
        isCurrentTab: false,
      },
      {
        name: 'outgoing',
        label: translate('page.body.requests.tab.outgoing'),
        isCurrentTab: true,
      },
    ]
  }, [])

  const onClick = useCallback(
    (route: string) => {
      const navigation =
        navigationTabsArray.find(
          (n) => n.name.toLowerCase() === route.toLowerCase(),
        ) || navigationTabsArray[0]
      router.push(`/super/yellowNetwork/requests/${navigation.name}`)
    },
    [navigationTabsArray],
  )

  const renderNavigationTabs = useMemo(() => {
    return (
      <div className="w-full min-w-max pb-4">
        <NavTabs
          tabs={navigationTabsArray}
          onClick={onClick}
          activeTabClassName={
            'bg-primary-cta-color-60 text-primary-cta-layer-color-60 font-semibold text-sm rounded'
          }
          defaultTabClassName={
            'bg-neutral-control-color-30 text-neutral-control-layer-color-70 hover:bg-neutral-control-color-50 font-semibold text-sm rounded'
          }
          tabsContainerClassName="flex space-x-2"
        />
      </div>
    )
  }, [navigationTabsArray])

  const breadcrumbItems = [
    {
      title: translate('page.sidebar.navigation.yellow network'),
      href: '/super/yellowNetwork',
    },
    {
      title: translate(
        'page.sidebar.navigation.yellow network.submenu.requests',
      ),
      href: '/super/yellowNetwork/requests',
    },
    { title: translate('page.tab.header.requests.outgoing') },
  ]

  return (
    <>
      <Head>
        <title>
          {appTitle(translate('page.tab.header.requests.outgoing'))}
        </title>
      </Head>
      <div className="flex flex-col h-screen w-full">
        <Breadcrumb items={breadcrumbItems} />
        <div className={wrapperClassName}>
          {renderNavigationTabs}
          <OutgoingRequests />
        </div>
      </div>
    </>
  )
}

export default withAuth(withAdminAuth(OutGoing))
