# Ultraleap

## Pre-reqs
- Install Ultraleap TouchFree: https://developer.leapmotion.com/touchfree#download-touchfree

## References
- https://docs.ultraleap.com/touchfree-user-manual/tooling-for-web.html
- https://developer.leapmotion.com/touchfree-tooling-for-web
- https://github.com/ultraleap/TouchFree-Tooling-Examples/tree/develop/Examples-Web

## Clone

```bash
git clone --recursive https://github.com/osuapp/ultraleap.git
git submodule update --init --recursive
```

## Setup
- NOTE: Can't use pnpm since it has problem with setting up workspace defined in package.json that references TouchFree. npm works fine though.
```bash
npm i
```

## Run

```bash
pnpm dev
```

Open http://localhost:3000