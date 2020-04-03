/**
 * @desc 常量
 */

const GlobalConst = {}
GlobalConst.DEBUG = (process.env.NODE_ENV === 'dev')

// 开发环境
GlobalConst.server = process.env.NODE_ENV

// 内部版本更新时间
GlobalConst.internalVersion = '2019-08-26'

// na和url参数
GlobalConst.nativeInfo = {}
// 打点参数
GlobalConst.statisticalInfo = {}

export default GlobalConst
