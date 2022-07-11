'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Kid', [{
      name: "Андрей",
      surname: "Мотков",
      phone: "71234567890",
      ClassId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.bulkDelete('Kid', null, {});     
  }
};
