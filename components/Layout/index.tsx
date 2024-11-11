import {
  AcceptRequestModal,
  ActivationHeaderProps,
  CancelRequestModal,
  CookiePopup,
  DepositButton,
  DepositModal,
  LoginButtonWidget,
  LoginModal,
  MarketSelectorWidget,
  RejectRequestModal,
  SendRequestModal,
  Layout as SharedLayout,
  SidebarProps,
  WalletConnectedState,
  WithdrawButton,
  WithdrawModal,
  getConfigs,
  navigation,
  navigationAdmin,
  navigationApp,
  navigationAppItem,
  navigationLoggedin,
  navigationMobile,
  toggleLoginModalOpen,
  useAppDispatch,
  useAppSelector,
  useHandleWeb3Event,
} from '@openware/opendax-web-sdk'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { JSX, PropsWithChildren, useMemo } from 'react'
import { useIntl } from 'react-intl'
import ErrorBoundary from '../ErrorBoundary'

const ActivationHeader = dynamic<ActivationHeaderProps>(
  () =>
    import('@openware/opendax-web-sdk').then(
      (mod: any) => mod.ActivationHeader,
    ),
  {
    ssr: false,
  },
)

export function Layout(
  props: PropsWithChildren<{ className?: string; withoutLayout?: boolean }>,
): JSX.Element {
  const markets = useAppSelector((state) => state.markets.markets)
  const user = useAppSelector((state) => state.user.user)
  const currentMarket = useAppSelector((state) => state.markets.currentMarket)
  const colorTheme = useAppSelector((state: any) => state.globalSettings.color)
  const { participant_status } = getConfigs()
  const dispatch = useAppDispatch()
  const isLoginModalOpen = useAppSelector(
    (state) => state.globalSettings.isLoginModalOpen,
  )

  const router = useRouter()

  const intl = useIntl()

  useHandleWeb3Event()

  const isLoggedin = useMemo(() => user?.id, [user?.id])
  const isAdmin = useMemo(
    () => ['admin', 'superadmin'].includes(user?.role),
    [user?.role],
  )

  const navigations = useMemo((): navigationApp[] => {
    const mainNavigation = isLoggedin ? navigationLoggedin : navigation

    return [
      {
        app: 'mainapp',
        pathnames: mainNavigation.map<navigationAppItem>(
          (nav: navigationAppItem) => {
            if (nav.submenus?.length) {
              return {
                ...nav,
                name: intl.formatMessage({
                  id: `page.sidebar.navigation.${nav.name.toLowerCase()}`,
                }),
                submenus: nav.submenus.map((submenu: any) => {
                  return {
                    ...submenu,
                    name: intl.formatMessage({
                      id: `page.sidebar.navigation.${nav.name.toLowerCase()}.submenu.${submenu.name.toLowerCase()}`,
                    }),
                  }
                }),
              }
            }

            return {
              ...nav,
              name: intl.formatMessage({
                id: `page.sidebar.navigation.${nav.name.toLowerCase()}`,
              }),
              path:
                nav.path === '/trading' && markets?.length
                  ? currentMarket
                    ? `${nav.path}/${currentMarket.id}`
                    : `${nav.path}/${markets[0].id}`
                  : nav.path,
            }
          },
        ),
      },
    ]
  }, [isLoggedin, markets, currentMarket])

  const mobileNavigation = useMemo((): navigationApp[] => {
    if (!navigationMobile) return []

    return [
      {
        app: 'mainapp',
        pathnames: navigationMobile.map<navigationAppItem>(
          (nav: navigationAppItem) => {
            if (nav.submenus?.length) {
              return {
                ...nav,
                name: intl.formatMessage({
                  id: `page.sidebar.navigation.${nav.name.toLowerCase()}`,
                }),
                submenus: nav.submenus.map((submenu: any) => {
                  return {
                    ...submenu,
                    name: intl.formatMessage({
                      id: `page.sidebar.navigation.${nav.name.toLowerCase()}.submenu.${submenu.name.toLowerCase()}`,
                    }),
                  }
                }),
              }
            }

            return {
              ...nav,
              name: intl.formatMessage({
                id: `page.sidebar.navigation.${nav.name.toLowerCase()}`,
              }),
              path:
                nav.path === '/trading' && markets?.length
                  ? currentMarket
                    ? `${nav.path}/${currentMarket.id}`
                    : `${nav.path}/${markets[0].id}`
                  : nav.path,
            }
          },
        ),
      },
    ]
  }, [navigationMobile])

  const adminNavigation = useMemo((): navigationApp[] => {
    if (!isAdmin) return []

    return [
      {
        app: 'mainapp',
        pathnames: navigationAdmin.map<navigationAppItem>(
          (nav: navigationAppItem) => {
            if (nav.submenus?.length) {
              return {
                ...nav,
                name: intl.formatMessage({
                  id: `page.sidebar.navigation.${nav.name.toLowerCase()}`,
                }),
                submenus: nav.submenus.map((submenu: any) => {
                  return {
                    ...submenu,
                    name: intl.formatMessage({
                      id: `page.sidebar.navigation.${nav.name.toLowerCase()}.submenu.${submenu.name.toLowerCase()}`,
                    }),
                  }
                }),
              }
            }

            return {
              ...nav,
              name: intl.formatMessage({
                id: `page.sidebar.navigation.${nav.name.toLowerCase()}`,
              }),
              path: nav.path,
            }
          },
        ),
      },
    ]
  }, [isAdmin, navigationAdmin])

  const buttonsList = useMemo(() => {
    return isLoggedin
      ? [
          {
            name: 'Metamask',
            component: <LoginButtonWidget />,
            label: intl.formatMessage({
              id: 'page.sidebar.bottom.account',
            }),
          },
          {
            name: 'Deposit',
            component: <DepositButton />,
            label: intl.formatMessage({
              id: 'page.body.deposit.button.deposit',
            }),
          },
          {
            name: 'Withdraw',
            component: <WithdrawButton />,
            label: intl.formatMessage({
              id: 'page.body.withdraw.button.withdraw',
            }),
          },
        ]
      : [
          {
            name: 'Metamask',
            component: <LoginButtonWidget />,
            label: intl.formatMessage({
              id: 'page.sidebar.bottom.account',
            }),
          },
        ]
  }, [isLoggedin])

  const adminButtonsList = useMemo(() => {
    if (!isAdmin) return []

    return [
      {
        name: 'admin',
        label: intl.formatMessage({
          id: 'page.sidebar.navigation.admin',
        }),
        path: '/admin/project/default',
      },
      {
        name: 'user',
        label: intl.formatMessage({
          id: 'page.sidebar.navigation.user',
        }),
        path: '/trading',
      },
    ]
  }, [isAdmin])

  const sidebarProps: SidebarProps = {
    currentApp: 'mainapp',
    navigations,
    mobileNavigation,
    adminNavigation,
    adminButtonsList,
    showAdminNavigation: isAdmin,
    classNames:
      'bg-navbar-background-color sm:border-r border-divider-color-20',
    bottomClasses:
      'fixed w-screen bottom-0 z-30 flex-shrink-0 md:hidden flex h-16 bg-navbar-background-color border-t border-divider-color-20 w-full left-0',
    navActiveClassNames:
      'bg-navbar-control-bg-color-10 text-navbar-control-layer-color-60',
    navGroupActiveClassNames:
      'bg-navbar-control-bg-color-10 rounded-lg text-navbar-control-layer-color-60',
    navInactiveClassNames:
      'text-neutral-control-layer-color-60 hover:bg-navbar-control-bg-color-10',
    isLoggedin: false,
    buttonsList,
    colorTheme,
  }

  if (props.withoutLayout) {
    return props.children as JSX.Element
  }

  return (
    <SharedLayout
      containerClassName={props.className}
      sidebarProps={sidebarProps}
      headerProps={{ show: false }}
      customHeader={
        participant_status !== 'active' &&
        !router.pathname.includes(navigationAdmin[0].path) && (
          <ActivationHeader isAdmin={isAdmin} />
        )
      }
      wrapperClassname={'flex flex-col w-0 flex-1 h-screen'}
    >
      <>
        <ErrorBoundary isAdmin={isAdmin}>
          {props.children}
          <MarketSelectorWidget />
          <DepositModal />
          <WithdrawModal />
          <SendRequestModal />
          <AcceptRequestModal />
          <RejectRequestModal />
          <CancelRequestModal />
          <WalletConnectedState />
          <LoginModal
            open={isLoginModalOpen}
            setOpen={() => dispatch(toggleLoginModalOpen())}
          />
          <CookiePopup hideReadMore={false} />
        </ErrorBoundary>
      </>
    </SharedLayout>
  )
}
