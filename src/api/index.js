import Request from 'luch-request' // 引入 luch-request 库
import { handleSign } from '@fe/gateway-sign' // 引入 Gateway 网关
import baseConfig from '@/config/index' // 引入 config 配置文件

let http = new Request({
  baseURL: baseConfig.baseUrl, // 取配置文件的 请求地址
})

let token = uni.getStorageSync('token') // 获取token

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 验签
    let signData = handleSign({
      sysCode: baseConfig.SYS_CODE, // 应用code
      secret: baseConfig.SECRET, // 应用秘钥
      method: config.method.toUpperCase(), // 请求方法
      rawData:
        config.method.toUpperCase() === 'GET' ? config.params : config.data, //请求参数
      token,
    })
    // 添加header
    config.header = {
      ...signData,
    }
    // 其他自定义请求配置 根据需求自行配置 ...

    return config
  },
  (config) => {
    return Promise.reject(config)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 响应成功  可使用async await 做异步操作

    console.log(response)
    return Promise.resolve(response)
  },
  (response) => {
    // 响应失败

    console.log(response)
    return Promise.reject(response)
  }
)
export default http
