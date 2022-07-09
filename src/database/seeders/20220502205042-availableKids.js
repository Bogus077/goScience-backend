'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('AvailableKid', [{
      name: 'Иван',
      lastName: 'Иванов',
      position: 'кадет',
      level: 1,
      strength: 1,
      agility: 1,
      accuracy: 1,
      intellect: 1,
      speed: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Петр',
      lastName: 'Петров',
      position: 'кадет',
      level: 2,
      strength: 1,
      agility: 2,
      accuracy: 1,
      intellect: 2,
      speed: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Сидор',
      lastName: 'Сидоров',
      position: 'ефрейтор',
      level: 3,
      strength: 2,
      agility: 2,
      accuracy: 3,
      intellect: 2,
      speed: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Вася',
      lastName: 'Пупкин',
      position: 'мл. сержант',
      level: 4,
      strength: 3,
      agility: 2,
      accuracy: 3,
      intellect: 4,
      speed: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {    
    await queryInterface.bulkDelete('AvailableKid', null, {});     
  }
};
