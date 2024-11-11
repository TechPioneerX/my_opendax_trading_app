import {
  CoreProvider,
  appTitle,
  getConfigs,
  isBrowser,
  useSetMobileDevice,
} from '@openware/opendax-web-sdk'
import '@openware/opendax-web-sdk/index.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { JSX, useCallback, useEffect, useMemo } from 'react'
import { Layout } from '../components'
import '../styles/globals.css'

const CustomizationWidget = dynamic(
  () =>
    import('@openware/opendax-web-sdk').then(
      (mod: any) => mod.CustomizationWidget,
    ),
  {
    ssr: false,
  },
)

const Alerts = dynamic(
  () => import('@openware/opendax-web-sdk').then((mod: any) => mod.Alerts),
  {
    ssr: false,
  },
)

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const isMobile = useSetMobileDevice()
  const router = useRouter()

  const gitCommitSha = useMemo(() => {
    return (
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || // comes from the Vercel deployment
      process.env.NEXT_PUBLIC_GIT_COMMIT_SHA // comes from the Drone config through the Docker build
    )
  }, [
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    process.env.NEXT_PUBLIC_GIT_COMMIT_SHA,
  ])

  const getBucket = useCallback(async () => {
    const res = await fetch('/api/storage/bucket/logos', {
      method: 'POST',
      body: null,
    })

    return res
  }, [])

  const handleUploadImage = useCallback(async (name: string, file: File) => {
    const data = new FormData()
    data.append(name, file)

    const res = await fetch('/api/storage/upload', {
      method: 'POST',
      body: data,
    })

    return res
  }, [])

  const mainContent = useMemo(() => {
    return (
      <>
        <Component {...pageProps} />
        {!isMobile && (
          // @ts-ignore
          <CustomizationWidget
            onUploadImage={handleUploadImage}
            getBucket={getBucket}
          />
        )}
      </>
    )
  }, [isMobile, pageProps])

  useEffect(() => {
    if (isBrowser()) {
      const hashCommit = localStorage.getItem('hashCommit')
      if (hashCommit === 'undefined') {
        localStorage.setItem('hashCommit', JSON.stringify(gitCommitSha))
      } else if (hashCommit !== JSON.stringify(gitCommitSha)) {
        localStorage.clear()
        localStorage.setItem('hashCommit', JSON.stringify(gitCommitSha))
      }
    }
  }, [isBrowser, gitCommitSha])

  const favicon = useMemo(() => {
    const appLogos = getConfigs().appLogos

    if (appLogos) {
      const newLogos = JSON.parse(appLogos)

      return newLogos?.favicon?.data?.publicUrl || '/favicon.svg'
    }

    return '/favicon.svg'
  }, [getConfigs()])

  const layoutProps = useMemo(() => {
    if (router?.pathname == '/trading/[marketID]') {
      return {
        className:
          'overflow-y-auto no-scrollbar mb-6 md:flex md:flex-grow md:overflow-hidden md:mb-0',
      }
    }
    if (
      router?.pathname.includes('/history') ||
      router?.pathname.includes('/orders') ||
      router?.pathname.includes('/settings') ||
      router?.pathname.includes('/balances')
    ) {
      return {
        className: 'overflow-y-auto no-scrollbar',
      }
    }
  }, [router?.pathname])

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href={favicon} />
        <meta name="git-commit" content={gitCommitSha} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          charSet="UTF-8"
        />
        <title>{appTitle()}</title>
      </Head>
      <CoreProvider>
        <div className="bg-main-background-color">
          <Alerts />
          <Layout {...layoutProps}>{mainContent}</Layout>
        </div>
      </CoreProvider>
    </>
  )
}
