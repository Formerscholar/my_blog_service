const db = require('../models')

module.exports = {
  async getlist(req, res, next) {
    try {
      const data = await db.Article.findAll({
        order: [['updatedAt', 'DESC']],
      })
      req.data = data
    } catch (error) {
      req.data = error
    }
    next()
  },
}
