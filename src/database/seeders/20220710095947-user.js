'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('User', [{
      phone: "+79370621137",
      password: "admin",
      name: "Владислав",
      surname: "Шарков",
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.bulkDelete('User', null, {});     
  }
};
