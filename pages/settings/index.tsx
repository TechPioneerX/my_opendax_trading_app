import {
  AccountModal,
  appTitle,
  CustomizationSwitcherWidget,
  LanguageSelectorWidget,
  OTPSwitcher,
  toggleLoginModalOpen,
  Tooltip,
  useAppDispatch,
  useAppSelector,
  useDApp,
  useSetMobileDevice,
} from '@openware/opendax-web-sdk'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { FC, useCallback, useState } from 'react'
import { useIntl } from 'react-intl'

// @ts-ignore
const ThemeSwitcher = dynamic(
  () =>
    import('@openware/opendax-web-sdk').then((mod) => mod.ThemeSwitcherWidget),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
)

const SettingsPage: FC = () => {
  const intl = useIntl()

  const dispatch = useAppDispatch()
  const { disconnect } = useDApp()
  const isMobile = useSetMobileDevice()
  const [showModal, setModal] = useState(false)

  const user = useAppSelector((state) => state.user.user)

  const translate = useCallback((id: string) => intl.formatMessage({ id }), [])

  const handleDisconnect = useCallback(() => {
    setModal(false)
    disconnect()
  }, [])

  const handleConnectDisconnectClick = useCallback(() => {
    if (user.id) {
      setModal(!showModal)
    } else {
      dispatch(toggleLoginModalOpen())
    }
  }, [user])

  const connectOrDisconnectWalletText = translate(
    `page.body.settings.rows.${user.id ? 'account' : 'signin'}`,
  )

  const customIcon = (
    <svg
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g>
        <path d="M0 0h24v24H0z" />
        <path
          fill="gray"
          fillRule="evenodd"
          d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2Zm0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm-.01 6c.558 0 1.01.452 1.01 1.01v5.124A1 1 0 0 1 12.5 18h-.49A1.01 1.01 0 0 1 11 16.99V12a1 1 0 1 1 0-2h.99ZM12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2Z"
        />
      </g>
    </svg>
  )

  return (
    <>
      <Head>
        <title>{appTitle(translate('page.tab.header.settings'))}</title>
      </Head>
      <div className="flex flex-col h-full w-full p-6 bg-body-background-color">
        <div className="border-b border-divider-color-20 pb-6">
          <span className="text-text-color-100 text-2xl leading-8 font-semibold">
            {translate('page.body.settings.header.label')}
          </span>
        </div>
        <div className="border-b border-divider-color-20 py-4 flow-root">
          <div className="float-left h-full flex items-center">
            <span className="text-text-color-90 text-lg leading-6 font-medium">
              {translate('page.body.settings.rows.language')}
            </span>
          </div>
          <div className="float-right">
            <LanguageSelectorWidget />
          </div>
        </div>
        <div className="border-b border-divider-color-20 py-4 flow-root">
          <div className="float-left h-full flex items-center">
            <span className="text-text-color-90 text-lg leading-6 font-medium">
              {translate('page.body.settings.rows.theme')}
            </span>
          </div>
          <div className="float-right">
            <ThemeSwitcher />
          </div>
        </div>
        {user.role === 'superadmin' && !isMobile ? (
          <div className="border-b border-divider-color-20 py-4 flow-root">
            <div className="float-left h-full flex items-center">
              <span className="text-text-color-90 text-lg leading-6 font-medium">
                {translate('page.body.settings.rows.customization')}
              </span>
            </div>
            <div className="float-right">
              <CustomizationSwitcherWidget />
            </div>
          </div>
        ) : null}
        {/* <div className="border-b border-divider-color-20 py-4 flow-root">
                    <div className="float-left h-full flex items-center">
                        <span className="text-text-color-90 text-lg leading-6 font-medium">
                            {translate(
                                'page.body.settings.rows.connection.type',
                            )}
                        </span>
                    </div>
                    <div className="float-right">
                        <ConnectionTypeSwitcherWidget />
                    </div>
                </div> */}
        {user.id && (
          <div className="border-b border-divider-color-20 py-4 flow-root">
            <div className="float-left h-full flex items-center">
              <span className="text-text-color-90 text-lg leading-6 font-medium">
                {translate('page.body.settings.rows.otp')}
              </span>
            </div>
            <div className="float-left ml-2 mt-3">
              <Tooltip
                content={
                  <>{translate('page.body.settings.rows.otp.tooltip')}</>
                }
                align={'right'}
                textWrapperClassname={
                  'text-sm shadow-lg border ml-2 -mb-1.5 border-slate-100 text-text-color-70 leading-snug shadow-lg px-3 py-2 rounded'
                }
                icon={customIcon}
              />
            </div>
            <div className="float-right">
              <OTPSwitcher />
            </div>
          </div>
        )}
        <div
          onClick={handleConnectDisconnectClick}
          className="cursor-pointer border-b border-divider-color-20 py-4 flow-root"
        >
          <div className="float-left h-full flex items-center">
            <span className="text-text-color-90 text-lg leading-6 font-medium">
              {connectOrDisconnectWalletText}
            </span>
          </div>
          <button
            className="border-none bg-transparent float-right"
            aria-label={connectOrDisconnectWalletText}
          >
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path
                d="M2 13H4V18H16V2H4V7H2V1C2 0.734784 2.10536 0.48043 2.29289 0.292893C2.48043 0.105357 2.73478 0 3 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1V19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H3C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V13ZM8 9V6L13 10L8 14V11H0V9H8Z"
                fill="var(--app-neutral-control-layer-color-40)"
              />
            </svg>
          </button>
        </div>
      </div>
      {user.id && (
        <AccountModal
          open={showModal}
          setOpen={setModal}
          email={user.email}
          handleLogout={() => handleDisconnect()}
        />
      )}
    </>
  )
}

export default SettingsPage
