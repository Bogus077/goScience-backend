'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('UserClass', [{
      UserId: 1,
      ClassId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.bulkDelete('UserClass', null, {});     
  }
};
