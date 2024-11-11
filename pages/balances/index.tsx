import {
  appTitle,
  BalancesWidget,
  useSetMobileDevice,
  withAuth,
} from '@openware/opendax-web-sdk'
import classnames from 'classnames'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { FC, JSX, useCallback } from 'react'
import { useIntl } from 'react-intl'

const SymbolsWidget = dynamic(
  () =>
    import('@openware/opendax-web-sdk').then((mod: any) => mod.SymbolsWidget),
  {
    ssr: false,
  },
)

const Balances: FC = (): JSX.Element | null => {
  const intl = useIntl()
  const isMobile = useSetMobileDevice()
  const wrapperClassName = classnames('flex flex-col w-full', {
    'h-screen p-6 drop-shadow-md': !isMobile,
    'h-full': isMobile,
  })
  const translate = useCallback(
    (id: string, value?: any) => intl.formatMessage({ id }, { ...value }),
    [],
  )

  return (
    <>
      <Head>
        <title>{appTitle(translate('page.tab.header.symbols'))}</title>
      </Head>
      <div className="flex flex-col h-full w-full">
        <div className={wrapperClassName}>
          {isMobile ? <BalancesWidget /> : <SymbolsWidget />}
        </div>
      </div>
    </>
  )
}

export default withAuth(Balances)
