const db = require('../models')
const { paging } = require('../utils')

module.exports = {
  async getlist(req, res, next) {
    let { page = 1 } = req.query
    ~~page < 1 ? 1 : ~~page
    try {
      const data = await db.Article.findAll({
        include: [
          {
            model: db.Category,
            attributes: ['id', 'name'],
          },
          {
            model: db.User,
            attributes: ['id', 'nickname', 'avatar', 'gender'],
          },
        ],
        order: [['updatedAt', 'DESC']],
        offset: (page - 1) * paging,
        limit: paging,
      })
      req.data = data
    } catch (error) {
      req.data = error
    }
    next()
  },
}
