'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'html/css/javascript',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'jquery/lodash',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'vue/react',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'nodejs',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '小程序',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'flutter',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {})
  },
}
