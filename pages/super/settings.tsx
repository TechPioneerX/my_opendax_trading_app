import {
  Breadcrumb,
  appTitle,
  withAdminAuth,
  withAuth,
} from '@openware/opendax-web-sdk'
import Head from 'next/head'
import * as React from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

const Settings: React.FC = () => {
  const intl = useIntl()
  const translate = useCallback(
    (id: string, value?: any) => intl.formatMessage({ id }, { ...value }),
    [],
  )

  const breadcrumbItems = [
    { title: translate('page.sidebar.navigation.settings') },
  ]

  return (
    <>
      <Head>
        <title>{appTitle(translate('page.tab.header.settings'))}</title>
      </Head>
      <Breadcrumb items={breadcrumbItems} />
      <h1>Settings</h1>
    </>
  )
}

export default withAuth(withAdminAuth(Settings))
