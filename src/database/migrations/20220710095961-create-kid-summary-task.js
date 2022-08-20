'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KidSummaryTask', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      KidId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Kid',
          key: 'id',
        },
        unique: false,
      },
      label: {
        type: Sequelize.STRING,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      dayStatus: {
        type: Sequelize.BOOLEAN,
      },
      weekStatus: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('KidSummaryTask');
  }
};