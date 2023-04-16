# Ultraleap

## Pre-reqs

-   Install Ultraleap TouchFree: https://developer.leapmotion.com/touchfree#download-touchfree

## References

-   https://docs.ultraleap.com/touchfree-user-manual/tooling-for-web.html
-   https://developer.leapmotion.com/touchfree-tooling-for-web
-   https://github.com/ultraleap/TouchFree-Tooling-Examples/tree/develop/Examples-Web

## Clone

```bash
git clone --recursive https://github.com/OSU-App-Club/GestureProject-UltraLeap.git
git submodule update --init --recursive
```

## Setup

-   NOTE: Can't use pnpm since it has problem with setting up workspace defined in package.json that references TouchFree. npm works fine though.

```bash
npm i
```

## Run

### Websocket API

-   Starts a websocket where only 1 client is allowed to connect at a time to a create new Kafka connection
-   NOTE: This api is not made up by NextJS, it is a separate API that is used to create a new connection to Kafka. The NextJS pages/api directory was deleted.

```bash
cd api
ts-node index.ts
```

### NextJS

-   This generates a random 6 digit pin code that must be copied to the client desktop to control it. Click start to continue to next page where you can use Ultraleap to control mouse.

```bash
pnpm dev
```

-   Open http://localhost:3000
