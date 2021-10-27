# 一、快速上手
## 1.1依赖环境
首先得有 [Node.js](https://nodejs.org/)，并确保 node 版本是 10.13 或以上。
111111
```
# 打印 node 版本
node -v
v10.13.0
```
推荐使用 yarn 管理 npm 依赖
```
# 全局安装 yarn
npm i yarn -g
```
## 1.2安装依赖
```
yarn
// or
npm install
```
## 1.3本地开发
```
// 薯片mPaas小程序
yarn dev:mp-shupian
yarn dev // miniu调试工具

// 微信小程序
yarn dev:mp-weixin
```

> miniu调试工具只对薯片mPaas小程序调试开发或是支付宝生态小程序调试开发

> miniu官网: https://miniu.alipay.com/

## 1.4构建部署
```
// 薯片mPaas小程序
yarn build:mp-shupian

// 薯片mPaas小程序
yarn build:mp-weixin
```

# 二、基础
## 2.1环境变量
在构建或者代码在端上运行中需要一些跟区分于环境的变量，用于配置构建流程或者运行时过程，这时候我们可以配置环境变量。
### 2.1.1运行时环境变量
运行时环境变量需要以 VUE_APP_ 开头，比如在 .env 中配置：
```
VUE_APP_SP_ENV = ${SP_ENV}
```
在代码中使用：
```
console.log(process.env.VUE_APP_SP_ENV)
// 输出 development
```
### 2.1.2编译时环境变量列表
-  NODE_ENV node 运行环境变量
-  VUE_APP_SP_ENV 应用运行环境变量
-  UNI_OUTPUT_DIR 输出目录
-  UNI_PLATFORM 平台

## 2.2目录结构
```
├── README.md
├── babel.config.js
├── dist
│   └── shupian
│       ├── app.acss
│       ├── app.js
│       ├── app.json
│       ├── common
│       ├── mini.project.json
│       ├── pages
│       └── static
├── jsconfig.json
├── mini.project.json
├── package-lock.json
├── package.json
├── postcss.config.js
├── prettier.config.js
├── public
│   └── index.html
├── src
│   ├── App.vue
│   ├── api
│   │   └── index.js
│   ├── common
│   │   └── spptMd
│   ├── config
│   │   ├── index.js
│   │   └── modules
│   ├── main.js
│   ├── manifest.json
│   ├── pages
│   │   └── index
│   ├── pages.json
│   ├── static
│   │   └── logo.png
│   └── uni.scss
└── yarn.lock
```