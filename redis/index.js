var redis = require('redis'),
  RDS_PORT = 6379, //端口号
  RDS_HOST = '127.0.0.1', //服务器IP
  RDS_PWD = 'porschev', //密码
  RDS_OPTS = {} //设置项

const get = (key) => {
  var client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS)
  client.auth(RDS_PWD, function (err) {
    if (err) throw err
  })
  return new Promise((reslove, reject) => {
    client.on('connect', () => {
      client.get(key, (err, value) => {
        if (err) reject(err)
        reslove(JSON.parse(value))
        client.quit()
      })
    })
  })
}

const set = (key, value) => {
  var client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS)
  client.auth(RDS_PWD, function (err) {
    if (err) throw err
  })
  return new Promise((reslove, reject) => {
    client.on('connect', (err) => {
      if (err) reject(err)
      client.set(key, JSON.stringify(value))
      reslove('success')
      client.quit()
    })
  })
}

module.exports = {
  get,
  set,
}
