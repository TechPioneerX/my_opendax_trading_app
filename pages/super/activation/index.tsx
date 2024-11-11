import {
  ExclamationTriangleIcon as ExclamationIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid'
import {
  appTitle,
  getConfigs,
  useAppSelector,
  useSetMobileDevice,
  withAdminAuth,
  withAuth,
} from '@openware/opendax-web-sdk'
import classnames from 'classnames'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

const Activation: React.FC = () => {
  const intl = useIntl()
  const translate = useCallback(
    (id: string, value?: any) => intl.formatMessage({ id }, { ...value }),
    [],
  )
  const theme = useAppSelector(
    (state: { globalSettings: { color: any } }) => state.globalSettings.color,
  )
  const isMobile = useSetMobileDevice()
  const wrapperClassName = classnames('flex flex-col h-full w-full pb-12', {
    'h-full p-6 items-center': !isMobile,
    'p-4': isMobile,
  })
  const { participant_status } = getConfigs()
  const router = useRouter()

  React.useEffect(() => {
    participant_status === 'active' && router.replace('/trading')
  }, [participant_status])

  return (
    <>
      <Head>
        <title>{appTitle(translate('page.tab.header.activation'))}</title>
      </Head>
      <div className={wrapperClassName}>
        <div className="flex flex-col items-star justify-center max-w-[512px]">
          <div className="w-full flex justify-center items-center mb-6">
            <Image
              width={204}
              height={30}
              src={
                theme === 'dark'
                  ? '/images/logo-dark-mode.svg'
                  : '/images/logo-white-mode.svg'
              }
              alt="logo"
            />
          </div>
          <p className="text-text-color-90 text-2xl font-semibold mb-3">
            Activation
          </p>
          <p className="text-base	text-text-color-80 mb-4">
            To activate the platform, we need some information about you and
            your company. Below is a short guide on what to do next:
          </p>
          <div className="flex flex-col items-start w-full mb-6">
            <p className="text-lg text-text-color-80 font-semibold mb-2">
              First:
            </p>
            <ol className="text-text-color-80 text-base list-decimal mb-4 list-inside">
              <li>Sign the OpenDAX Term Sheet.</li>
            </ol>
            <p className="w-full bg-neutral-control-color-40 rounded py-1 px-2 flex items-center mb-2 text-base text-neutral-control-layer-color-70">
              <InformationCircleIcon className="h-4 w-4 shrink-0 text-neutral-control-layer-color-40 mr-1.5" />
              You will be redirected to the external service Pandadoc.
            </p>
            <p className="w-full bg-system-yellow-10 py-1 px-2 rounded flex items-center mb-2 text-system-yellow-80">
              <ExclamationIcon className="h-4 w-4 shrink-0 text-system-yellow-40 mr-1.5" />
              Signed OpenDAX Term Sheet is a requirement to activate the
              platform.
            </p>
            <Link
              legacyBehavior
              href={
                'https://eform.pandadoc.com/?eform=0e7d8527-d2f4-4509-8b45-b6ba4cba1fc8'
              }
            >
              <a
                target="_blank"
                className="py-2 px-3 text-primary-cta-layer-color-60 text-sm font-semibold bg-primary-cta-color-60 rounded shadow-sm hover:text-primary-cta-layer-color-80 hover:bg-primary-cta-color-80"
              >
                Sign the Document
              </a>
            </Link>
          </div>
          <div className="flex flex-col items-start w-full mb-6">
            <p className="text-text-color-80 font-semibold mb-2 text-base">
              Second:
            </p>
            <p className="flex flex-col items-start text-text-color-80 text-base mb-3">
              <ol className="list-decimal mb-4 list-inside">
                <li>
                  Please fill out the form, activating “Fill out the form”
                  button.
                </li>
                <li>
                  The form will be submitted for review. This may take up to 2
                  business days.
                </li>
                <li>You will be informed when the activation is completed.</li>
              </ol>
              <ul className="list-disc list-inside">
                <li>
                  Please carefully enter your data into the form. We will not be
                  able to service your request unless the data is entered
                  correctly.
                </li>
                <li>You have only one chance to fill out the form.</li>
                <li>Filling out the form will take you up to 10 minutes.</li>
                <li>
                  Please prepare the following docs for the form: your ID
                  document, company certificate. Supported format for files:
                  PNG, JPEG, max size is 6 MB.
                </li>
                <li>
                  ID document can be: National ID, Passport, Driver License,
                  Resident permit.
                </li>
                <li>
                  In case if you need support or you have questions, please
                  contact to support by&nbsp;
                  <a
                    className="text-secondary-cta-color-60"
                    href="mailto:support@openware.com"
                  >
                    support@openware.com
                  </a>
                  .
                </li>
              </ul>
            </p>
            <div className="flex flex-col items-start w-full">
              <p className="w-full bg-system-yellow-10 py-1 px-2 rounded flex items-center mb-2 text-system-yellow-80">
                <ExclamationIcon className="h-4 w-4 shrink-0 text-system-yellow-40 mr-1.5" />
                Please don&apos;t close the Typeform window until you&apos;re
                done, otherwise we won&apos;t be able to accept your activation
                request.
              </p>
              <Link
                legacyBehavior
                href={'https://h38x4ua8xff.typeform.com/to/kBxVNTdX'}
              >
                <a
                  target="_blank"
                  className="py-2 px-3 text-primary-cta-layer-color-60 text-sm font-semibold bg-primary-cta-color-60 rounded shadow-sm hover:text-primary-cta-layer-color-80 hover:bg-primary-cta-color-80"
                >
                  Fill out the form
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuth(withAdminAuth(Activation))
