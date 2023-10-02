'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EventTeacher', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TeacherId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Teacher',
          key: 'id',
        },
        unique: false,
      },
      EventId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Event',
          key: 'id',
        },
        unique: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EventTeacher');
  }
};