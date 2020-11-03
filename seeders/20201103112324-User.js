'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'admin',
          password: '123456',
          nickname: 'CCC',
          avatar:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604412892283&di=1be89fea2a9768d40f80e6c953fd46b7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F01%2F20180901190625_wmpeq.thumb.700_0.jpeg',
          gender: 0,
          token: 'fwrehrtjrj',
          outtime:'23453453',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'test',
          password: '123456',
          nickname: '冬天的暖阳',
          avatar:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604412892283&di=d70f2bc877da951d75a9212261e21d23&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201408%2F30%2F20140830180834_XuWYJ.png',
          gender: 1,
          token: 'fwrehrtjrj',
          outtime:'23453453',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  },
}
