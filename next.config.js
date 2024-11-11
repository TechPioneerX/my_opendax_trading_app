const ContentSecurityPolicyDev = `
    default-src 'self';
    connect-src 'self' 
    ${process.env.CSP_ROOT_URL} 
    https://cdn.jsdelivr.net https://rinkeby.infura.io https://goerli.infura.io
    https://rpc.goerli.mudit.blog
    https://rpc-mainnet.maticvigil.com
    https://rpc-mumbai.maticvigil.com
    https://mainnet.infura.io/v3/4ae27108c4354b70a4c5390a5359c0cb
    ${process.env.LOCAL_MOCKSERVER_URLS};
    script-src 'self' 'unsafe-eval' 'unsafe-inline'; 
    style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; 
    img-src 'self' https://api.qrserver.com/ ${process.env.CSP_ROOT_URL} blob: data: https://cdn.jsdelivr.net;
    font-src 'self' https://fonts.gstatic.com; 
    object-src 'none'; 
    child-src 'self'; 
    upgrade-insecure-requests; 
    block-all-mixed-content 
    `
const ContentSecurityPolicyProduction = `
    default-src 'self';
    connect-src 'self' 
    https://cdn.jsdelivr.net https://rinkeby.infura.io https://goerli.infura.io
    https://rpc.goerli.mudit.blog
    https://rpc-mainnet.maticvigil.com
    https://rpc-mumbai.maticvigil.com
    https://mainnet.infura.io/v3/4ae27108c4354b70a4c5390a5359c0cb;
    script-src 'self' 'unsafe-inline'; 
    style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; 
    img-src 'self' blob: data: https://cdn.jsdelivr.net;
    font-src 'self' https://fonts.gstatic.com; 
    object-src 'none'; 
    child-src 'self'; 
    upgrade-insecure-requests; 
    block-all-mixed-content 
    `

const ContentSecurityPolicy =
  process.env.NODE_ENV === 'development'
    ? ContentSecurityPolicyDev
    : ContentSecurityPolicyProduction

const securityHeaders = [
  {
    key: 'content-security-policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
]

module.exports = {
  compress: false,
  async redirects() {
    return [
      {
        source: '/history',
        destination: '/history/deposits',
        permanent: true,
      },
      {
        source: '/orders',
        destination: '/orders/all',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['cdn.jsdelivr.net'],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: `Function('return this')();`,
        replace: `(function(){ return this }).call(null)`,
      },
    })

    return config
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
}
