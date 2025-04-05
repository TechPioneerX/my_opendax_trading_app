# my_opendax_trading_app

white-label Crypto Trading app based on [OpenDAX v4 NextJS](https://www.npmjs.com/package/@openware/create-opendax-web-app) platform

## Prerequisites

```yaml
# You’ll need to have Node 16.0.0 or a later version on your local development machine (but it’s not required on the server).
node.js: 16.17.1

# npx is a package runner tool that comes with npm 8.1+ and higher
npm: 8.15.0
```

## Getting Started

```bash
$ npm install

# start platform
$ npm run dev
```

```console
> my_opendax_trading_app@0.1.1 dev
> next dev -p 3001

ready - started server on 0.0.0.0:3001, url: http://localhost:3001
info  - Loaded env from /home/borismkv/Documents/boris_work/pupilee/my_opendax_trading_app/.env
...
```

```bash
# install dependencies for mockserver
$ npm i npm-run-all colors header-case-normalizer js-combinatorics --save-dev

# run mockserver
$ npm explore @openware/opendax-web-sdk -- npm run mockserver
```

```console
mockserver
Mockserver serving mockserver on: http://0.0.0.0:8000
Ranger: listening on ws://0.0.0.0:9003/ws
gRPC mock server running on 0.0.0.0:50051
...
```

### Visit http://localhost:3001/

![OpenDAX Next.js platform](screenshot.png)

&copy; 2024 codeguru, All rights reserved.
