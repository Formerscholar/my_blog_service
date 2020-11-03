const Send = ({ code = 200, data = {}, msg = '' }) => {
  if (msg === '') {
    msg = code === 200 ? '请求成功' : '请求失败'
  }
  return {
    code,
    data,
    msg: msg,
  }
}

const randomToken = () => {
  let len = 32
  let $chars =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' + new Date().getTime()
  let maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

const outtime = 30 * 60 * 1000

module.exports = {
  Send,
  randomToken,
  outtime
}
