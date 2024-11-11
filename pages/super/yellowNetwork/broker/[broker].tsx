import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import {
  Breadcrumb,
  appTitle,
  useSetMobileDevice,
  withAdminAuth,
  withAuth,
} from '@openware/opendax-web-sdk'
import classnames from 'classnames'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC, JSX, useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'

const BrokerInfoWidget = dynamic(
  () =>
    import('@openware/opendax-web-sdk').then(
      (mod: any) => mod.BrokerInfoWidget,
    ),
  {
    ssr: false,
  },
)

const SettlementsInfoWidget = dynamic(
  () =>
    import('@openware/opendax-web-sdk').then(
      (mod: any) => mod.SettlementsInfoWidget,
    ),
  {
    ssr: false,
  },
)

const Broker: FC<{}> = (): JSX.Element => {
  const intl = useIntl()

  const router = useRouter()
  const isMobile = useSetMobileDevice()
  const wrapperClassName = classnames('flex flex-col h-full w-full pb-8', {
    'flex flex-col h-screen w-full p-6': !isMobile,
  })

  const translate = useCallback((id: string) => intl.formatMessage({ id }), [])

  const breadcrumbItems = [
    {
      title: translate('page.sidebar.navigation.yellow network'),
      href: '/super/yellowNetwork',
    },
    {
      title: translate(
        'page.sidebar.navigation.yellow network.submenu.open channels',
      ),
      href: '/super/yellowNetwork/openChannels',
    },
    { title: translate('page.body.broker.header') },
  ]

  const renderDesktop = useMemo(() => {
    return (
      <>
        <div className="w-full">
          <div className="flex inline-block items-center mb-3">
            <button
              className="flex items-center justify-center border border-divider-color-20 h-8 w-8 rounded-md"
              onClick={() => {
                router.back()
              }}
            >
              <ChevronLeftIcon
                className={classnames(
                  'flex-shrink-0 text-neutral-control-layer-color-30',
                )}
              />
            </button>
            <span className="pl-2 text-text-color-60 text-xl">Back</span>
          </div>
          <div className="flex">
            <div className="w-1/2 mr-2">
              <BrokerInfoWidget />
            </div>
            <div className="w-1/2">
              <SettlementsInfoWidget />
            </div>
          </div>
        </div>
      </>
    )
  }, [])

  return (
    <>
      <Head>
        <title>{appTitle(translate('page.tab.header.broker'))}</title>
      </Head>
      <Breadcrumb items={breadcrumbItems} />
      <div className={wrapperClassName}>{renderDesktop}</div>
    </>
  )
}

export default withAuth(withAdminAuth(Broker))
