import {
  appTitle,
  Breadcrumb,
  useSetMobileDevice,
  withAdminAuth,
  withAuth,
} from '@openware/opendax-web-sdk'
import classnames from 'classnames'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'

const OpenChannelsWidget = dynamic(
  () =>
    import('@openware/opendax-web-sdk').then(
      (mod: any) => mod.OpenChannelsWidget,
    ),
  {
    ssr: false,
  },
)

const OpenChannels: React.FC = () => {
  const intl = useIntl()
  const isMobile = useSetMobileDevice()
  const wrapperClassName = classnames('flex flex-col w-full pb-8', {
    'h-screen p-6': !isMobile,
    'h-full': isMobile,
  })

  const translate = useCallback(
    (id: string, value?: any) => intl.formatMessage({ id }, { ...value }),
    [],
  )

  const breadcrumbItems = [
    {
      title: translate('page.sidebar.navigation.yellow network'),
      href: '/super/yellowNetwork',
    },
    {
      title: translate(
        'page.sidebar.navigation.yellow network.submenu.open channels',
      ),
    },
  ]

  return (
    <>
      <Head>
        <title>{appTitle(translate('page.tab.header.openchannels'))}</title>
      </Head>
      <div className="flex flex-col h-full w-full">
        <Breadcrumb items={breadcrumbItems} />
        <div className={wrapperClassName}>
          <OpenChannelsWidget />
        </div>
      </div>
    </>
  )
}

export default withAuth(withAdminAuth(OpenChannels))
