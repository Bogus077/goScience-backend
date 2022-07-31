'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TasksMonth', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE,
      },
      points: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: Sequelize.BOOLEAN,
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
      TasksQuarterId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'TasksQuarter',
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
    await queryInterface.dropTable('TasksMonth');
  }
};