var createError = require('http-errors')
var express = require('express')
var path = require('path')
var fs = require('fs')
var logger = require('morgan')
const multer = require('multer')

const { verificationToken } = require('./middleware/main')

var usersRouter = require('./routes/users')
var articleRouter = require('./routes/article')
var categoryRouter = require('./routes/category')
var commentRouter = require('./routes/comment')

var app = express()

const upload = multer({
  dest: './static/upload',
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
})

const uploadimg = multer({
  dest: './static/uploadimg',
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
})


app.post('/?*', uploadimg.single('uploadimg'), (req, res, nest) => {
  let { file } = req
  if (file) {
    let extname = path.extname(file.originalname)
    fs.renameSync(file.path, file.path + extname)
    req.uploadURL = '/upload/' + file.filename + extname
  }
  nest()
})


app.post('/users?*', upload.single('avatar'), (req, res, nest) => {
  let { file } = req
  if (file) {
    let extname = path.extname(file.originalname)
    fs.renameSync(file.path, file.path + extname)
    req.uploadURL = '/upload/' + file.filename + extname
  }
  nest()
})


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/users', usersRouter)
app.use('/article', [verificationToken, articleRouter])
app.use('/category', [verificationToken, categoryRouter])
app.use('/comment', [verificationToken, commentRouter])



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
