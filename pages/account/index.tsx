import {
  appTitle,
  EmailInfo,
  useSetMobileDevice,
  WalletInfo,
  withAuth,
} from '@openware/opendax-web-sdk'
import classnames from 'classnames'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { FC, JSX, useCallback } from 'react'
import { useIntl } from 'react-intl'

const MultipleWalletsWidget = dynamic(
  () =>
    import('@openware/opendax-web-sdk').then(
      (mod: any) => mod.MultipleWalletsWidget,
    ),
  {
    ssr: false,
  },
)

const Account: FC = (): JSX.Element | null => {
  const intl = useIntl()
  const isMobile = useSetMobileDevice()
  const wrapperClassName = classnames('flex flex-col w-full pb-6', {
    'h-screen p-6': !isMobile,
    'h-full': isMobile,
  })
  const translate = useCallback(
    (id: string, value?: any) => intl.formatMessage({ id }, { ...value }),
    [],
  )

  return (
    <>
      <Head>
        <title>{appTitle(translate('page.tab.header.account'))}</title>
      </Head>
      <div className="flex flex-col h-full w-full">
        <div className={wrapperClassName}>
          <span className="text-2xl font-medium border-b border-divider-color-20 pb-4 text-text-color-100">
            {translate('page.tab.header.account')}
          </span>
          <EmailInfo />
          <WalletInfo displayAppName={true} />
          <MultipleWalletsWidget />
        </div>
      </div>
    </>
  )
}

export default withAuth(Account)
